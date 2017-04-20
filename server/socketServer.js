// Get dependencies
var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');


// For the console
var util = require('util');
var _ = require('lodash');
var chalk = require('chalk');

console.log(chalk.bgGreen(">>>>> in ./server/socketServer <<<<<<"));

// Get our API routes
var reqSocketData = require('./routes/reqSocketData');

var app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// CORS enablement
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //res.setHeader("Access-Control-Allow-Methods", "POST, GET, PATCH, DELETE, OPTIONS, PUT");
  next();
});

// Set our routes
app.use('/reqSocketData', reqSocketData);

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
server.listen(port, () => console.log(`Express app Server listening on port:${port}`));

// ==== socket.io Server setup  ===================================
// var socketServer = require('http');
// app.set('port', process.env.PORT || 7777);
// socketServer.createServer(app).listen(app.get('port'));
// var io = require('socket.io')(socketServer);
// console.log('Express HTTP server for Socket.io listening on port:' + app.get('port'));
// ================================================================


// ==== socket.io  ===================================
// io.on('connection', function (socket) {
//     socket.on('Socket message', function (msg) {
//         console.log('socketServer.js Connect message: ' + msg + ' on Port: ' + app.get('port'));
//         socket.emit('barf', 'world')
//     });
//     socket.on('disconnect', function () {
//         console.log('user disconnected');
//     });
// });
// ==== socket.io  ===================================