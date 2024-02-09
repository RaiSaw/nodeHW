// API HW
import express from 'express';
import router from "../routes/homework.mjs"


const app = express()
app.use(express.json())
app.use(router);

const port = process.env.port || 3000;

app
.get("/", (req, res) => {
    res.status(201).send("Hey, wanna learn something cool 🌱?");
})

.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

