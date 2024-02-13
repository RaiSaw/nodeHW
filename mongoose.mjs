// HW - CRUD Express - Mongoose
import express from 'express';
import router from "./routes/model.mjs"
import { models } from './utils/constants.mjs';
import path from 'path';
import { query } from "express-validator"
import mongoose from "mongoose"
import Mong from '../mongoose/mong.mjs';

const app = express()
app.use(express.json())
app.use(express.static('public'))
/* app.use(router); */
const port = process.env.port || 3000;

mongoose
    .connect("mongodb://localhost:27017/sample")
    .then(() => console.log("Connected to db"))
    .catch((err) => console.log(`Error: ${err}`))

// Create a new blog post and insert into database
const article = await Mong.create({
 title: 'Awesome Post!',
 slug: 'awesome-post',
 published: true,
 content: 'This is the best post ever',
 tags: ['featured', 'announcement'],
});
console.log(article);

article.title = "The most awesome post!"
await article.save()
console.log(article)

app
.get("/", (req, res) => {
    res.status(201).send("Hello!");
})

.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

