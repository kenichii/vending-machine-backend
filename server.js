const dotenv = require('dotenv');

const http = require('http');
const app = require('./app')

const port = process.env.PORT || 3001;

const server = http.createServer(app);
dotenv.config({ path: ('.env') })
console.log(`Your port is ${process.env.PORT}`)

server.listen(port);
