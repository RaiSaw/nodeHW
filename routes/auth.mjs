import { Router } from "express";
import passport from "passport"

const router = Router();
router
// Sessions 🛒
// each session maps to > own user > virtual cart > any session data can be attached to session object
/* .post("/api/auth",  (req, res) => {
    const { body: { name, password }}= req
    const findUser = users.find((user) => user.name === name)
    if (!findUser || findUser.password !== password) return res.status(401).send("Bad credentials")

    req.session.user = findUser;
    return res.status(200).send(findUser)
}) */
/* .get("/api/auth/status", (req, res) => {
    req.sessionStore.get(req.sessionID, (err, session) => {
        console.log(session)
    })
    return req.session.user ? res.status(200).send(req.session.user) : res.status(400).send("Not authenticated!");
}) */
// log in & out
.post("/api/auth", passport.authenticate("local"), (req, res) => {
        res.sendStatus(200)
})
.get("/api/auth/status", (req, res) => {
    //return req.session.user? res.status(200).send(req.session.user) : res.status(400).send("Not authenticated!")
    console.log(`Inside /auth/status endpoint`)
    /* console.log(req.user) */
    console.log(req.session)
    /* console.log(req.sessionID) */
    return req.user ? res.send(`You're logged in, ${req.user.name}`) : res.sendStatus(401);
})
.post("/api/auth/logout", (req, res) => {
    // destroy session
    if (!req.user) return res.sendStatus(401)
    req.logout((err) => {
        if(err) return res.sendStatus(400)
        res.sendStatus(200)
    })
})
export default router;
