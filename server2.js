import { createServer } from "http";
import getNiggers from './niggaController.js';

const PORT = process.env.PORT;

// Logger Middleware

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
}

const jsonMiddleware = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
}

const niggaHandler = (req, res) => {
    res.write(JSON.stringify(getNiggers()));
    res.end();
}

const NotFoundHandler = ( req , res ) => {
    res.statusCode = 404;
    res.write(JSON.stringify({message: '404 ! route not found'}));
    res.end()
}


const getNiggerByID = (req, res) => {
    const id = req.url.split('/')[3];
    const nigger = getNiggers().find((nigger) => nigger.id === parseInt(id));
    if (nigger) {
        res.write(JSON.stringify(nigger));
    } else {
        res.statusCode = 404;
        res.write(JSON.stringify({message: '404 ! Nigga not found'}));
    }
    res.end();
}

const server = createServer((req, res) => {
    logger(req, res, () => {
        jsonMiddleware(req, res, () => {
            if (req.url === '/api/niggers' && req.method === 'GET') {
                niggaHandler(req, res)
            }
            else if (req.url.match(/\/api\/niggers\/([0-9]+)/) && req.method === 'GET') {
                getNiggerByID(req, res)
            } else {
                NotFoundHandler(req, res)
            }
        })

    });

})

server.listen(PORT, () => {
    console.log(`I am connected to localhost:${PORT})`)
})