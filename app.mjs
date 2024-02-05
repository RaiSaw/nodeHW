import express from 'express';
import path from 'path';
const app = express()

app.use(express.json())
app.use(express.static('public'))/* (path.join(__dirname, 'public'))) */

const db = []

const port = process.env.port || 3000;

app
.get("/", (req, res) => {
    res.status(201).send("Welcome to my Express.js server!");
})
.get("/about", (req, res) => {
    res.status(201).send("Hey, how's life lately? I'm Rai, I used Express.js to create this project. ");
})

.get("/greet", (req, res) => {
    const {name} = req.query;
    console.log("Hello", name, ", it's nice to see you 🌞!")
    res.status(201).send(`Hello ${name}, it's nice to see you 🌞!`);
})
.post("/api/info", (req, res) => {
    const {information} = req.body
    db.push(information)
    console.log('💁:', information)
    res.status(201)./* json({"message": information}) */send(information)
})
.get("/([\$])foryou", (req, res) => {
    res.status(201).send(`💁, ${db}`);
})

.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

