const http = require("http");
const fs = require("fs");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');

    let path = './';
    switch(req.url) {
        case '/':
            res.statusCode = 200;
            path += 'index.html';
            break;
        case '/about':
            res.statusCode = 200;
            path+= 'about.html';
            break;
        case '/redirect':
            res.statusCode = 301;
            res.setHeader('Location', '/')
            break;
        default:
            res.statusCode = 404;
            path += '404.html';
            break;
    }

    fs.readFile(path, (err, data) => {
        if(err) {
            console.error(err);
            res.end();
        } else {
            res.end(data);
        }
    });
    res.write("<h1>Hello World</h1>");
});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));