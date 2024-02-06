import passport from "passport"
import {Strategy} from 'passport-local'
import { users } from "../utils/constants.mjs"
import { User } from "../mongoose/user.mjs"

//tells passport how to serialize data into the session
passport.serializeUser(user, done) => {
    console.log(`Inside Serialize User`)
    console.log(user)
    done(null, user.id)
}
//take id and reveal the user - when deserializing u dont need all the user info, just id
passport.deserializeUser(async(id, done) => {
    console.log(`Inside Deserializer`)
    console.log(`Deserializing User ID: ${id}`)
    try {
        const findUser = await User.findById(id) /* users.find((user) => user.id === id); */
        if (!findUser) throw new Error("User not found");
        done(null, findUser)
    } catch (err) {
        done(err, null);
    }

})
/* export default passport.use(
    new Strategy(  {usernameField: "email"},  (username, password, done) => {
        console.log(`Username: ${username}`)
        console.log(`Password: ${password}`)
        try {
            const findUser = users.find((user) => user.username ===username);
            if (!findUser) throw new Error("User not found");
            if (findUser.password !== password)
                throw new Error("Invalid credentials");
            done(null, findUser);
        } catch (err) {
            done(null, err);
        }

    })
) */
// database
export default passport.use(
    new Strategy( /* {usernameField: "email"}, */(username, password, done) => {
        try {
           const findUser = await User.findOne({username})
           if (!findUser) throw new Error("User not found")
           if (findUser.password !== password) throw new Error("Bad Credentials")
           done(null, findUser);
        } catch (err) {
            done(null, err);
        }
    })
) 