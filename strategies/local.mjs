import passport from "passport"
import { Strategy } from 'passport-local'
import { users } from "../utils/constants.mjs"
import { User } from "../mongoose/user.mjs"
import { comparePW } from "../utils/helpers.mjs"

// takes user obj and storing in session
//tells passport how to serialize data into the session
passport.serializeUser((user, done) => {
    /* console.log(`Inside Serialize User`) */
    /* console.log(user) */
    done(null, user.id)
})

//takes id and reveal the user (attaches to user obj) - when deserializing u dont need all the user info, just id or username
passport.deserializeUser(async (id, done) => {
    /* console.log(`Inside Deserializer`) */
    /* console.log(`Deserializing User ID: ${id}`) */
    try {
        /* const findUser = users.find((user) => user.id === id); */
        const findUser = await User.findById(id)
        if (!findUser) throw new Error("User not found");
        done(null, findUser)
    } catch (err) {
        done(err, null);
    }
})
/* export default passport.use(
    new Strategy(  { usernameField: "name" } , (name, password, done) => {
        console.log(`name: ${name}`)
        console.log(`password: ${password}`)
        try {
            const findUser = users.find((user) => user.name === name);
            if (!findUser) throw new Error("User not found");
            if (findUser.password !== password)
                throw new Error("Invalid credentials");
            done(null, findUser);
        } catch (err) {
            done(null, err);
        }
    })
) */
// mongoDB
export default passport.use(
    new Strategy( {usernameField: "name"}, async(name, password, done) => {
        console.log(`name: ${name}`)
        console.log(`password: ${password}`)
        try {
           const findUser = await User.findOne({name})
           if (!findUser) throw new Error("User not found")
           if (!comparePW(password, findUser.password))
            throw new Error("Bad Credentials")
           done(null, findUser);
        } catch (err) {
            done(null, err);
        }
    })
)