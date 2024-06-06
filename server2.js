import { createServer } from "http";
import getNiggers from './niggaController.js';

const PORT = process.env.PORT;

const server = createServer((req, res) => {
    if (req.url === '/api/niggers' && req.method === 'GET') {
        res.setHeader('Content-type', 'application/json')
        res.write(JSON.stringify(getNiggers()));
        res.end();
    }
    else if (req.url.match(/\/api\/niggers\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[3];
        const nigger = getNiggers().find((nigger) => nigger.id === parseInt(id));
        res.setHeader('Content-type', 'application/json')
        if (nigger) {
            res.write(JSON.stringify(nigger));
        } else {
            res.statusCode = 404;
            res.write(JSON.stringify({message: '404 ! Nigga not found'}));
        }
        res.end();
    } else {
        res.setHeader('Content-type', 'application/json')
        res.statusCode = 404;
        res.write(JSON.stringify({message: '404 ! route not found'}));
        res.end()
    }
})

server.listen(PORT, () => {
    console.log(`I am connected to localhost:${PORT})`)
})