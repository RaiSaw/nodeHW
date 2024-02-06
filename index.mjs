// In-Depth Express - Ans
import express from 'express';
import router from "./routes/cookie.mjs"
import { query, validationResult, checkSchema, body, matchedData } from "express-validator";
import { userSchema } from './utils/validationSchema.mjs';
import { users } from './utils/constants.mjs';
import { handleIndexId } from './utils/middlewares.mjs';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import mongoose from "mongoose"

const app = express()

mongoose
    .connect("mongodb://localhost/express_tut")
    .then(() => console.log("Connected to db"))
    .catch((err) => console.log(`Error: ${err}`))

app.use(express.json())
app.use(express.static('public'))
app.use(cookieParser(/* "secret" */))  // signed cookies - any str value
app.use(session({
    secret:"whateverthatis",
    saveUninitialized: false,
    resave: false,
    cookie: {maxAge: 60000*60},
}))

app.use(passport.initialize());
app.use(passport.session())
app.use(router);

// Middleware
/* const handleIndexId = (req, res, next) => {
    const {
        params: {id}
    } = req;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return res.sendStatus(400);
    const findUserIndex = users.findIndex((user) => user.id === parsedId);
    if (findUserIndex === -1) return res.sendStatus(404);
    req.findUserIndex = findUserIndex;
    next();
} */
const port = process.env.port || 3000;
// Cookies🍪 - web server🧑‍🍳 => data 🚌 Web browser => cl computer🧑‍💻
app
.get("/cookie", (req, res) => {
    console.log(req.session)
    console.log(req.session.id)
    req.sessionStore.get(req.session.id, (err, sessionData) => {
        if(err){
            console.log(err)
            throw err;
        }
        console.log(sessionData);
    })
    req.session.visited = true;
    res.cookie("hello", "world", { maxAge: 60000 }) // signed:true
    res.status(201).send("Here you go, you can take a small bite!🍪👾");
    /* console.log(req.headers.cookie);
    console.log(req.cookies);
    console.log(req.signedCookies) */
})
.post("/api/auth", passport.authenticate("local"), (req, res) => {
        res.sendStatus(200)
})
.get("/api/auth/status", (req, res) => {
    console.log(`Inside /auth/status endpoint`)
    console.log(req.user)
    return req.user ? res.send(req.user) : res.sendStatus(401);
})
.post("/api/auth/logout", (req, res) => {
    if (!req.user) return res.sendStatus(401)
    req.logout((err) => {
        if(err) return res.sendStatus(400)
        res.sendStatus(200)
    })
})

.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

