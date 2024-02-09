import { Router } from "express";
import { query, validationResult, checkSchema, matchedData } from "express-validator";
import { users } from "../utils/constants.mjs"
import { handleIndexId } from "../utils/middlewares.mjs"
import { userSchema } from "../utils/validationSchema.mjs"
import { User } from "../mongoose/user.mjs";
import { hashPassword } from "../utils/helpers.mjs";

const router = Router();
router
.get(
    "/users",
    query("filter")
        .isString()
        /* .withMessage("Must be string") */
        .notEmpty()
        .withMessage("Must not be empty")
        .isLength({ min: 3, max: 10})
        .withMessage("Must be at least 3-10 characters"),
    (req, res) => {
        const result = validationResult(req);
        console.log(result);
        /* console.log(req.query); */
        const { query: { filter, value } } = req;
        if (filter && value) return res.send( users.filter((user) => user[filter].includes(value)))
        return res.send(users);
})
/* .post(
    "/users",
    checkSchema(userSchema),
    (req, res) => {
        const result = validationResult(req);
        console.log(result);
        if (!result.isEmpty())
            return res.status(400).send({errors: result.array()});
        const data = matchedData(req);
        console.log(req.body);
        const { body } = req;
        const newUser = {id: users[users.length - 1].id + 1, ...data};
        users.push(newUser);
        return res.send(200)
}) */

// Database
.post(
    "/users",
    checkSchema(userSchema),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty())
            return res.status(400).send(result.array());
        /* const {body} = req; */
        const data = matchedData(req);
        console.log(data);
        data.password = hashPassword(data.password)
        console.log(data)
        const newUser = new User(data);
        try {
            const savedUser = await newUser.save(); //async
            return res.status(201).send(savedUser);
        } catch (err){
            console.log(err)
            return res.status(400);
        }
})
.get("/users/:id", handleIndexId, (req, res) => {
    const { findUserIndex } = req;
    /* console.log(req.params);
    const parsedId = parseInt(req.params.id);
    if (isNaN(parsedId))
    return res.status(400).send({msg: "Bad request!"}); */
    /* const findUser = users.find((user) => user.id === parsedId); */
    const findUser = users[findUserIndex];
    if (!findUser) return res.sendStatus(404);
    return res.send(findUser);
})

.put("/users/:id", handleIndexId, (req, res) => {
    const { body, findUserIndex } = req;
    /* users[findUserIndex] = {id : parsedId, ...body}; */
    users[findUserIndex] = {id : users[findUserIndex].id, ...body};
    return res.sendStatus(204);
})
.patch("/users/:id", handleIndexId, (req, res) => {
    const { body, findUserIndex } = req;
    users[findUserIndex] = {...users[findUserIndex], ...body};
    return res.sendStatus(204);
})
.delete("/users/:id", handleIndexId, (req, res) => {
    const {findUserIndex} = req;
    users.splice(findUserIndex, 1);
    return res.sendStatus(200);
})

export default router;