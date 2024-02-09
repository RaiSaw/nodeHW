// HW > CRUD Express > Auth_Mongo-CRUD
import express from 'express';
import router from "./routes/model.mjs"
import { models } from './utils/constants.mjs';
import path from 'path';
import { query } from "express-validator"
import { MongoClient } from 'mongodb';
import { connectToDB, getDB } from './mongo.mjs';

let db;

const app = express()
app.use(express.json())
/* app.use(express.static('public')) */
/* app.use(router); */

const port = process.env.port || 3000;

connectToDB((error) => {
    if (!error) {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`)
        })
        db = getDB();
    }
});

app
.get("/models", (req, res) => {
    //toArray(), forEach()- iterate on db-documents
    db.collection("models")
        .find().toArray()
        .then(resp => {
            res.status(200).json(resp)
        }).catch(err => {
            res.status(500).json({error: "Oops, can't retrieve data!" })
        })
})
.post()
