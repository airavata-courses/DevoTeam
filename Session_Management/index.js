const http = require('http');

const app = require('./app');

const port = process.env.PORT || 9000;

const server = http.createServer(app);

server.listen(port, () =>
  console.log(`Session Management listening on port ${port}!`)
);
