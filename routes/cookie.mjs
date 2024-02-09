import { Router } from "express";

// enables server to send cookies into the web browser and know whose cookies belongs to
const router = Router();
router
.get(
    "/cookie/bite",
    (req, res) => {
    console.log(req.headers.cookie);
    console.log(req.cookies);
    console.log(req.signedCookies)
    //sessions
    console.log(request.session)
    console.log(request.session.id)
    if (req.cookies.hello && req.cookies.hello === "world")
        return res.status(201).send("Alright, you can take the whole 🍪!");
    return res.status(403).send("Sorry, you need the correct cookie ✋🏽🚫🧁!");
})

export default router;