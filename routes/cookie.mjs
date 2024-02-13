// Cookies🍪 - web server🧑‍🍳 => data 🚌 Web browser => cl computer🧑‍💻
// - used by server to identify who the user is
import { Router } from "express";

// enables server to send cookies into the web browser and know whose cookies belongs to
const router = Router();
router
.get("/", (req, res) => {
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
    res.cookie("hello", "world", { maxAge: 60000 , signed:true })
    res.status(201).send("Here you go, a freshly-baked 🍪! 👾");
    console.log(req.headers.cookie);
    console.log(req.cookies);
    console.log(req.signedCookies)
})
.get("/cookie", (req, res) => {
    console.log(req.headers.cookie);
    console.log(req.cookies);
    console.log(req.signedCookies)
    //sessions
    console.log(req.session)
    console.log(req.session.id)
    if (req.signedCookies.hello && req.signedCookies.hello === "world")
        return res.status(201).send("Alright, have fun munching your 🍪 ⏳!");
    return res.status(403).send("Oh-oh, time's up!⌛️ You have no more access to the 🍪🫙!");
})

.post("/api/cart", (req, res) => {
    if (!req.session.user) return res.sendStatus(401)
    const {body: item} = req
    const {cart} = req.session
    if(cart) {
        cart.push(item)
    }else {
        req.session.cart = [item]
    }
    return res.status(201).send(item)
})
.get("/api/cart", (req, res) => {
    if (!req.session.user) return res.sendStatus(401)
    return res.send(req.session.cart ?? "Empty cart 🤷🏻")
})

export default router;

