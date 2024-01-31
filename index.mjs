// "type": "module",
import express from 'express';

const app = express()
app.use(express.json())
app.use(express.static('public'))

// Middleware
const loggingMw = (req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
}
// Middleware
const handleIndexId = (req, res, next) => {
    const {
        params: {id}
    } = req;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return res.sendStatus(400);
    const findUserIndex = users.findIndex((user) => user.id === parsedId);
    if (findUserIndex === -1) return res.sendStatus(404);
    req.findUserIndex = findUserIndex;
    next();
}
const port = process.env.port || 3000;

// Initial data
const users = [
    {name:"Ren", id:1},
    {name:"Ru", id:2},
    {name:"Rob", id:3},
]
app
.get("/", (req, res) => {
    res.status(201).send({msg: "Hello!"});
})
.get("/users", (req, res) => {
    console.log(req.query);
    const {query: {filter, value}} = req;
    if (filter && value) return res.send( users.filter((user) => user[filter].includes(value)))
    return res.send(users);
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
.post("/users", (req, res) => {
    console.log(req.body);
    const {body} = req;
    const newUser = {id: users[users.length - 1].id + 1, ...body};
    users.push(newUser);
    return res.send(200)
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

.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

