const http = require('http');
const url = require('url');
var fs = require('fs');

/* const express = require("express")
const app = express() */
// middleware - inbetween the response and request; barrier func that gets executed prior to body logic
/* app.use(express.json())
app.use(express.static('public')) */   // get will default to public
/* app.use(mw) */ //authenticate and secure all routes
/* app.use(require("cors")()) */
/* example of protecting route */
/* function mw(req, res, next){
    console.log("Hit them MW!")
    const {id} = req.params
    console.log("ID:",id)
    if (id != 3) {
        return res.sendStatus(403)
    }
    next()
} */
/* app.get("/", (req, res) => {
    res.status(200).send({"message": "Yo, whatsup!"}) */
    /* res.sendStatus(200)*/
    /* res.send("Hello!") */
/* }) */

/* app.delete("/delete/:id", mw, (req, res) => {
    const {id} = req.params
    console.log("What do you wanna delete?", id)
    res.sendStatus(200)
}) */

const hostname = "127.0.0.1";
const port = 3000;

// temp database sample
const db = [
    {
        "id": 1,
        "title": "Bodies",
        "type": "object",
        "imgUrl": "Assets/javierMirandaUnsplash.jpg"
      },
      {
        "id": 2,
        "title": "Helmet",
        "type": "object",
        "imgUrl": "Assets/lekoartsUnsplash.jpg"
      }
]

// handle GET request
const handleGetModels = (res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(db))
}

// handle POST request
const handlePostModels = async (req, res) => {
    try {
        let body = '';
        req.on('data', (chunk)=> {
            body += chunk;
        })
        await new Promise((resolve, reject)=> {
            req.on('end', () => {
                const model =  JSON.parse(body);
                db.push(model)
                // response
                res.writeHead(201, {"Content-Type": "application/json"});
                res.end(JSON.stringify(model))
                resolve()
            });
            req.on("error", (error)=> {
                reject(error);
            });
        })
    } catch (error) {
        // Handling error
        res.writeHead(400, {"Content-Type": "text/plain"});
        res.end(JSON.stringify(model))
    }
}

// handle PUT request
const handlePutModels =  (req, res, modelId) => {
    const model = db.find((m)=> m.id === modelId);
    if (model) {
        model.type = 'object';
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end("Unable to add data")
    }else {
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.end("Model not found")
    }
}

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true)
    const path =  parsedUrl.pathname;

    if (path === '/models' && req.method === 'GET'){
        handleGetModels(res);
    }
    else if (path === '/models' && req.method === 'POST') {
        await handlePostModels(res, req);
    }
    else if (path.startsWith('/models/') && req.method === 'PUT') {
        const modelId = parseInt(path.split('/')[2])
        handlePutModels(res, req, modelId);
    }
    else {
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.end("404 - Not found")
    }

});

server.listen(port, hostname, () => {
console.log(`Server running at http://${hostname}:${port}/`);
});

/* app.listen(PORT, () => console.log(`Server running on port ${PORT}`)) */