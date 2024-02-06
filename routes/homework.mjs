import { Router } from "express";
import { movingPlants } from "../utils/constants.mjs"
var obj;

const router = Router();
router
.get("/homework", (req, res) => {
    res.status(201).send(movingPlants);
})
.get("/homework/:id", (req, res) => {
    const parsedId = parseInt(req.params.id);
    if (isNaN(parsedId))
    return res.status(400).send({msg: "Bad request!"});
    const plants = movingPlants.find((plant) => plant.id === parsedId);
    if (!plants) return res.sendStatus(404);
    return res.send(plants);
})
export default router;