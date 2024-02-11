// HW > CRUD Express > Auth_Mongo-CRUD
import express from 'express';
import router from "./routes/model.mjs"
import { models } from './utils/constants.mjs';
import path from 'path';
import { query } from "express-validator"
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

app.get("/models", (req, res) => {
    //toArray(), forEach()- iterate on db-documents
    db.collection("models")
        .find().toArray()
        .then(resp => {
            res.status(200).json(resp)
        }).catch(err => {
            res.status(500).json({error: "Oops, couldn't retrieve data!" })
        })
});

app.get("/models/:id", (req, res) => {
    const parsedId = parseInt(req.params.id);
    if (isNaN(parsedId)) {
        return res.status(400).json({ error: "Invalid ID format." });
    }
        db.collection("models")
            .findOne({id: parsedId})
            .then((resp) => {
                if (resp){
                    res.status(200).json(resp);
                }else{
                    res.status(404).json({ error: `Model with id: ${req.params.id} not found` });
                }
            })
            .catch((error) => {
              res.status(500).json({
                error: `Could not fetch model id: ${parsedId} with error: ${error}`,
              });
            });
});

app.post("/newModel", (req, res) => {
    const body = req.body;
    //call express-validation here
    if (!body) {
        return res.status(400).json({ error: "Model body is empty." });
    }
    db.collection("models")
        .insertOne(body)
        .then(resp => {
            res.status(200).json(resp)
        }).catch(err => {
            console.error("Error creating new model:", err);
            res.status(500).json({error: "Oops, couldn't create a new model!" })
        })
});

app.patch("/models/:id", (req, res) => {
    const body = req.body;
    const parsedId = parseInt(req.params.id);
    if (isNaN(parsedId)) {
        return res.status(400).json({ error: "Invalid ID format." });
    }
    db.collection("models")
        .updateOne({id: parsedId},{$set: body})
        .then(resp => {
            res.status(200).json(resp)
        }).catch(err => {
            console.error("Error updating model:", err);
            res.status(500).json({error: "Oops, couldn't update the model!" })
        })
});

app.put("/models/:id", (req, res) => {
    const body = req.body;
    const parsedId = parseInt(req.params.id);
    if (isNaN(parsedId)) {
        return res.status(400).json({ error: "Invalid ID format." });
    }
    const filter = { id: parsedId };

    db.collection("models")
        .replaceOne( filter, body )
        .then(resp => {
            if (resp.matchedCount === 1) {
                res.status(200).json(resp);
            } else {
                res.status(404).json({ error: "Model not found." });
            }
        }).catch(err => {
            console.error("Error replacing model:", err);
            res.status(500).json({error: "Oops, couldn't replace the model!" })
        })
});

app.delete("/models/:id", (req, res) => {
    const parsedId = parseInt(req.params.id);
    if (isNaN(parsedId)) {
        return res.status(400).json({ error: "Invalid ID format." });
    }
    const filter = { id: parsedId };

    db.collection("models")
        .deleteOne(filter)
        .then(resp => {
            if (resp.deletedCount === 1) {
                res.status(200).json({ message: "Model deleted successfully." });
            } else {
                res.status(404).json({ error: "Model not found." });
            }
        }).catch(err => {
            console.error("Error deleting model:", err);
            res.status(500).json({error: "Oops, couldn't delete the model!" })
        })
});