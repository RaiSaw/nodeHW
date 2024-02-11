// HW - CRUD Express
import express from 'express';
import router from "./routes/model.mjs"
import { models } from './utils/constants.mjs';
import path from 'path';
import { query } from "express-validator"

const app = express()
app.use(express.json())
app.use(express.static('public'))
app.use(router);

const port = process.env.port || 3000;

app
.get("/", (req, res) => {
    res.status(201).send("Hello!");
})

.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

