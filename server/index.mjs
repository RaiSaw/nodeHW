// In-Depth Express
import "./env.mjs"
import express from "express";
import router from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import cors from "cors"
import {authorize} from "./handlers/users.mjs"
import { checkSchema } from "express-validator";
import { userSchema } from "./utils/validationSchema.mjs";
import { createUserHandler } from "./handlers/users.mjs";
import "./strategies/local.mjs";
import "./strategies/discord.mjs";


const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString)
const db = mongoose.connection
/* mongoose
    .connect("mongodb://localhost:27017/sample")
    .then(() => console.log("Connected to db"))
    .catch((err) => console.log(`Error: ${err}`)) */

const port = process.env.port || 3001;

const app = express();
    app.use(express.json())
    app.use(cors())
    /* app.use(express.static('public')) */
    app.use(cookieParser("CookieMonster"));  // for signed cookies to work- any str value- cookie's still visible, but has a signature, so it can detect if the client modified the cookie/hijacked a session
// Sessions
// each session maps to > own user > virtual cart > any session data can be attached to session object

    app.use(
        session({
            secret:"shhh",
            saveUninitialized: false, //session store- managing user sessions- e.g.true - persists user cart when user logs in again, also guests?
            resave: false,  //forces cookie in db to be resaved evry time
            cookie: { maxAge: 60000 * 60 }, // how long a user is signed in
            // persists session data - stored on db otherwise stored in in-memory store
            store: MongoStore.create({
                client: mongoose.connection.getClient()
            })
        })
    );
    // Passport
    app.use(passport.initialize());
    app.use(passport.session())

    // Log in & out
    app
    .get("/status", (req, res) => {
        console.log(req.session)
        return req.user ? res.send(`Welcome, ${req.user.name} 👾!`) : res.sendStatus(401);
    })

    .post("/auth", passport.authenticate("local"), (req, res) => {
        res.status(200).send(req.user)
    })
    .post("/logout", (req, res) => {
        // destroy session
        /* if (!req.user) return res.sendStatus(401) */
        console.log(req.user)
        req.logout((err) => {
            if(err) return res.sendStatus(400)
            res.status(200).send("Logged out!")
        })
    })

    //Discord 👾 Flow : url > 'authorize' > authenticate > callback url
    .get("/discord", passport.authenticate("discord")) //query param code is used to exchange w/ discord api to get access and refresh token
    // will redirect u to 3rd-party platform, clicking on 'authorize' will redirect on callback url
    .get(
        "/discord/redirect",
        passport.authenticate("discord"),// 2nd time authenticate-it will take the code query and exchange with an access & refresh token, @ the end it'll call the verify fn 
        (req, res) => {
            console.log(req.session)
            console.log(req.user.id)
            res.sendStatus(200);
        }
    )

    /* app.use(authorize) */
    app.use(router);
/* app.use(require("cors")()) *///
    //app.use('/api', router);

    app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    });