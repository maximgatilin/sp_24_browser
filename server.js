const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;
const baseDirectory = __dirname;

const server = http.createServer((req, res) => {
    const filePath = path.join(baseDirectory, req.url === '/' ? 'index.html' : req.url);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Not Found</h1>');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
