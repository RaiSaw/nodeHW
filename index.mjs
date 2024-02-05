// "type": "module",
import express from 'express';
import router from "./routes/user.mjs"
import { query, validationResult, checkSchema, body, matchedData } from "express-validator";
import { userSchema } from './utils/validationSchema.mjs';
import { users } from './utils/constants.mjs';
import { handleIndexId } from './utils/middlewares.mjs';

const app = express()
app.use(express.json())
app.use(express.static('public'))
app.use(router);

// Middleware
/* const handleIndexId = (req, res, next) => {
    const {
        params: {id}
    } = req;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return res.sendStatus(400);
    const findUserIndex = users.findIndex((user) => user.id === parsedId);
    if (findUserIndex === -1) return res.sendStatus(404);
    req.findUserIndex = findUserIndex;
    next();
} */
const port = process.env.port || 3000;

app
.get("/", (req, res) => {
    res.status(201).send({msg: "Hello!"});
})

.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

