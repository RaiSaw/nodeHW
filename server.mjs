// CRUD Models
import express from 'express';
import router from "./routes/model.mjs"
import { models } from './utils/constants.mjs';
import path from 'path';
import { schema } from './utils/validationSchema.mjs';
import { connectToDB, getDB } from './mongo.mjs';
import { query, validationResult, checkSchema, matchedData } from "express-validator";

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
})

app
.get("/models", (req, res) => {
    //toArray(), forEach()- iterate on db-documents
    db.collection("models")
        .find()
        .toArray()
        .then(resp => {
            res.status(200).json(resp)
        }).catch(err => {
            res.status(500).json({error: "Oops, couldn't retrieve data!" })
        })
})

.get("/models/:id", (req, res) => {
    const parsedId = parseInt(req.params.id);
        db.collection("models")
            .findOne({id: req.params.id})
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
})

.post("/newModel", checkSchema(schema), async (req, res) => {
    const result = validationResult(req);
    console.log(result);
    const data = matchedData(req);
    const dbs = [];
    await db.collection("models")
        .countDocuments()
        .then(resp => {
            console.log(resp)
            dbs.push(resp)
            console.log(dbs)
        }).catch(err => {
            console.error("Error getting length:", err);
        })
    const newMod = {id: (parseInt(dbs) + 1), ...data}; //   will change this to _id
    db.collection("models")
        .insertOne(newMod)
        .then(resp => {
            res.status(200).json(resp)
            console.log(resp)
        }).catch(err => {
            console.error("Error creating new model:", err);
            res.status(500).json({error: "Oops, couldn't create a new model!" })
        })
})

.patch("/models/:id", (req, res) => {
    const body = req.body;
    const result = validationResult(req);
    console.log(result);
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
})

.put("/models/:id", checkSchema(schema), (req, res) => {
    const result = validationResult(req);
    console.log(result);
    const parsedId = parseInt(req.params.id);
    const data = matchedData(req);
    if (isNaN(parsedId)) {
        return res.status(400).json({ error: "Invalid ID format." });
    }
    const newMod = {id: parsedId, ...data};
    db.collection("models")
        .replaceOne({ id: parsedId }, newMod )
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
})

.delete("/models/:id", (req, res) => {
    const parsedId = parseInt(req.params.id);
    const result = validationResult(req);
    console.log(result);
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