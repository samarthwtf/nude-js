import http from 'http';
import fs from 'fs/promises';
import url from 'url';
import path from 'path';

const PORT = process.env.PORT;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer(async (req, res) => {
    try {
        if (req.method === 'GET') {
            let file;
            if (req.url === '/') {
                file = path.join(__dirname, 'pages', 'home.html');
            } else if (req.url === '/children'){
                file = path.join(__dirname, 'pages', 'childrenPark.html');
            } else if (req.url === '/niggers') {
                file = path.join(__dirname, 'pages', 'niggaTragedy.html');
            } else {
                file = path.join(__dirname, 'pages', '404.html');
            }
            const data = await fs.readFile(file)
            res.setHeader('Content-Type', 'text/html')
            res.end(data);
        } else {
            throw new Error('Method not allowed')
        }
    } catch (error) {
        res.writeHead(500, {'Content-Type' : 'text/plain'})
        res.end('Server Error')
    }
})

server.listen(PORT, () => console.log(`listning to ${PORT}`))