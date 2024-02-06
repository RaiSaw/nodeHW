import { Router } from "express";
import { query, validationResult, checkSchema, matchedData } from "express-validator";
import { models } from "../utils/constants.mjs"
import { handleIndexId } from "../utils/middlewares.mjs"
import { schema } from '../utils/validationSchema.mjs';
/* import pkg from 'express';
const {fs} = pkg; */

const router = Router();
router
.get(
    "/models",
    query("title")
        .isString()
        .withMessage("Must be a string")
        .notEmpty()
        .withMessage("Must not be empty")
        .isLength({ min: 3, max: 10})
        .withMessage("Must be at least 3-10 characters"),
    (req, res) => {
        fs.readFile('../db.json', (err, data) => {
            if (err) {
              next(err) // Pass errors to Express.
            } else {
              res.send(data)
            }
        })
        const result = validationResult(req);
        console.log(result);
        const { query: { filter, value } } = req;
        if (filter && value)
            return res.send(models.filter((mod) => mod[filter].includes(value)))
        return res.send(models);
})
.post(
    "/models",
    checkSchema(schema),
    (req, res) => {
        const result = validationResult(req);
        console.log(result);
        if (!result.isEmpty())
            return res.status(400).send({errors: result.array()});
        const data = matchedData(req);
        const newMod = {id: models[models.length - 1].id + 1, ...data};
        models.push(newMod);
        return res.send(200)
})
.get("/models/:id", handleIndexId, (req, res) => {
    const { findModIndex } = req;
    const findMod = models[findModIndex];
    if (!findMod) return res.sendStatus(404);
    return res.send(findMod);
})

.put("/models/:id", handleIndexId, (req, res) => {
    const { body, findModIndex } = req;
    models[findModIndex] = {id : models[findModIndex].id, ...body};
    return res.sendStatus(204);
})
.patch("/models/:id", handleIndexId, (req, res) => {
    const { body, findModIndex } = req;
    models[findModIndex] = {...models[findModIndex], ...body};
    return res.sendStatus(204);
})
.delete("/models/:id", handleIndexId, (req, res) => {
    const {findModIndex} = req;
    models.splice(findModIndex, 1);
    return res.sendStatus(200);
})

export default router;