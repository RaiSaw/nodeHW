// Express sample 1
const express = require("express")
const app = express()
const PORT = 3000;

// middleware - inbetween the response and request; barrier func that gets executed prior to body logic
app.use(express.json())
app.use(express.static('public'))   // get will default to public
/* app.use(mw) */ //authenticate and secure all routes - logs mw globally, order matters to apply to all routes
/* app.use(require("cors")()) */

/* example of protecting route */
function mw(req, res, next){
    console.log("Hit them MW!")
    const {id} = req.params
    console.log("ID:",id)
    if (id != 3) {
        return res.sendStatus(403)
    }
    next()
}
//temporary database
const db = []

//Scheduler - db consoling qsec
/* function cron(ms, fn){
    async function callback(){
        clearTimeout(timeout)
        await fn()
        timeout = setTimeout(callback, ms)
    }
    let timeout = setTimeout(callback, ms)
    return () => { }
}
function consoleDB() {
    console.log("DB =", db)
}
cron(1000, consoleDB) */

app
.get("/", (req, res) => {
    console.log("Welcome!")
    res.status(200).send({"message": "Yo, whats up!"})
    /* res.sendStatus(200)*/
    /* res.send("Hello!") */
})
.delete("/", (req, res) => {
    console.log("Welcome!")
    res.sendStatus(200)
})

.post("/api/info", (req, res) => {
    const {information} = req.body
    console.log('The posted message was:', information)
    db.push(information)
    console.log('DB:', information)
    res.status(200).json({"message": information})
})
// query
.put("/api", (req, res) => {
    const {word, banana} = req.query
    console.log(word, banana)
    res.sendStatus(200)
})
/* must be before dynamic */
.delete("/delete/james/cool", (req, res) => {
    res.send("Who's James?")
})
// dynamic route param
.delete("/delete/:id", (req, res) => {
    const {id} = req.params
    console.log("What do you wanna delete?", id)
    res.sendStatus(200)
})

.listen(PORT, () => console.log(`Server running on port ${PORT}`))