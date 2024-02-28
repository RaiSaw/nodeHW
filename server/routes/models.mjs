import { Router } from "express";
import { validationResult, checkSchema, matchedData } from "express-validator";
import { modelSchema } from "../utils/validationSchema.mjs"
import { Model } from "../mongoose/model.mjs";

const router = Router();
router
.get("/models", async(req, res) => {
    try {
        const data = await Model.find();
        res.status(200).send(data)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})
.get("/models/:title", async (req, res) => {
    const {title} = req.params
    console.log(title)
    try {
        const data = await Model.findOne({title})
        res.status(200).send(data)
        console.log(title)
   }
   catch (error) {
       res.status(400).json({message: error.message})
   }
})

.get("/:creator", async (req, res) => {
    const {creator} = req.params
    try {
        const response = await Model.find({creator});
        res.status(200).send(response)
   }
   catch (error) {
       res.status(400).json({message: error.message})
   }
})

.post(
    "/models",
    checkSchema(modelSchema),
    async (req, res) => {
        const result = validationResult(req);
        console.log(result);
        const data = matchedData(req);
    await Model.create(data)
    .then(resp => {
        res.status(201).json(resp)
        console.log(resp)
    }).catch(err => {
        console.error("Error creating new model:", err);
        res.status(500).json({error: "Oops, couldn't create a new model!" })
    })
})

.patch("/models/:title", async(req, res) => {
    try{
        const title = req.params.title
        const filter = { title: title };
        const upData = req.body
        console.log(upData)
        const options = { new: true,  upsert: true }
        const data = await Model.findOneAndUpdate( filter, upData, options)
       /*  const data = await Model.save(); */
        res.send(data)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

.delete("/models/:title", async(req, res) => {
    try {
        const title = req.params.title
        const data = await Model.deleteOne({title})
        res.send(`${data.title} has been deleted!` )
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

export default router;