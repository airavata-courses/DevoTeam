const http = require('http');
const app = require('./app');
const port = process.env.PORT || 8081;
const server = http.createServer(app);

server.listen(port, () => console.log(`Nexrad app listening on port ${port}!`));
