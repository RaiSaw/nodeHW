const http = require('http');
const url = require('url');
var fs = require('fs'),
obj

const hostname = "127.0.0.1";
const port = 3000;
const models = [];
//Read json file
fs.readFile('./db.json', handleFile)

// Callback fn
function handleFile(err, data) {
    if(err) throw err;
    obj =  JSON.parse(data)
    console.log(obj["models"]);
}

// GET request
const handleGetModels = (res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(obj['models']));
}

//POST request
const handlePostModels = async (req, res) => {
    try {
        let body = '';
        req.on('data', (chunk) => {body += chunk; })
        await new Promise((resolve, reject) => {
            req.on('end', () => {
                const mods = JSON.parse(body);
                obj.models.push(mods);
                console.log(obj.models);
                fs.writeFile('db.json', JSON.stringify(obj), function(err){
                    if (err) throw err;
                    console.log('Object appended!');
                })
                // Response
                res.writeHead(201, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(mods));
                resolve();
            })
            req.on('error', error => reject(error));
        })
    } catch(error) {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.end('Invalid data!')
    }
}

// PUT request
const handlePutModels = (req, res, modelId) => {
    const mods = obj.models.find((m) => m.id === modelId)
    if (mods){
        // update type
        mods.type = "scene";
        // response
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(mods));
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'})
        res.end('Model not found');
    }
}
// Create server
const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    if (path === '/models' && req.method == 'GET') {
        handleGetModels(res);
    }
    else if (path === '/models' && req.method == 'POST'){
        await handlePostModels(req, res);
    }
    else if (path.startsWith('/models/') && req.method == 'PUT') {
        const modelId = parseInt(path.split('/')[2]);
        console.log(modelId);
        handlePutModels(req, res, modelId);
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not found')
    }
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});