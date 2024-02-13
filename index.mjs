// In-Depth Express
import express from "express";
import router from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import "./strategies/local.mjs";

mongoose
    .connect("mongodb://localhost:27017/sample")
    .then(() => console.log("Connected to db"))
    .catch((err) => console.log(`Error: ${err}`))


const port = process.env.port || 3000;


const app = express();
    app.use(express.json())
    /* app.use(express.static('public')) */
    app.use(cookieParser("cookieMonster"));  // for signed cookies to work- any str value

    app.use(
        session({
            secret:"shhh🤫", // password
            saveUninitialized: false, //session store- managing user sessions- e.g.true - persists user cart when user logs in again
            resave: false,  //forces cookie in db to be resaved evry time
            cookie: { maxAge: 60000 * 60 }, // how long a user is signed in
            // persists session data - stored on db
            store: MongoStore.create({
                client: mongoose.connection.getClient()
            })
        })
    );
    // Passport
    app.use(passport.initialize());
    app.use(passport.session())
    app.use(router);

    app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    });