const express = require("express")
const {connectToDB, getDB} = require('./mongoSample')
const app = express()
const PORT = 3000;

let db;

app
.get("/books", (req, res) => {
    // toArray
    // forEach
    db.collection("books").find().toArray().then(resp => {
        res.status(200).json(resp)
    }).catch(error => {
        res.status(500).json({error: "Error getting data"})
    })
})
.post("/newBook", (req, res) => {
    const body = req.body;
})

.listen(PORT, () => console.log(`Server running on port ${PORT}`))