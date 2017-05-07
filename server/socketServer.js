// Get dependencies
var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');

// node ib server
var nodeIBServer = require('./nodeIB');

// For the console
var util = require('util');
var _ = require('lodash');
var chalk = require('chalk');

console.log(chalk.bgGreen(">>>>> in ./server/socketServer <<<<<<"));

var app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '7777';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`SocketServer /==/ Express app Server listening on port:${port}`));

console.log('app.mountpath: ' + app.mountpath);
console.log('__dirname  ' + __dirname);
console.log("app.path():  " + app.path()); // ''

// Socket.io
var io = require('socket.io')(server);
var aString = '';

io.on('connection', function (socket) {
  // socket.emit('news', { hello: aString });
  socket.on('my other event', function (data) {
    console.log(data);
  });


  nodeIBServer.on('tickPrice', function (tickerId, tickType,
    price, canAutoExecute) {
    socket.emit('ibData', {
      tickerId: tickerId,
      tickType: nodeIBServer.util.tickTypeToString(tickType),
      price: price,
      canAutoExecute: canAutoExecute
    });
    console.log(
      '%s %s%d %s%d %s%s',
      chalk.yellow(util.format('[%s]', nodeIBServer.util.tickTypeToString(tickType))),
      chalk.bold('tickerId='), tickerId,
      chalk.bold('price='), price,
      chalk.bold('canAutoExecute='), canAutoExecute
    );
  });


});

