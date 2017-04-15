// Get dependencies
var express = require('express');
var path = require('path');
var http = require('http');
var app = express();

// For the console
var util = require('util');
var _ = require('lodash');
var chalk = require('chalk');

console.log(chalk.bgGreen(">>>>> in ./server/socketServer <<<<<<"));

// ==== socket.io Server setup  ===================================
var socketServer = require('http');
app.set('port', process.env.PORT || 7777);
socketServer.createServer(app).listen(app.get('port'));
var io = require('socket.io')(socketServer);
console.log('Express HTTP server for Socket.io listening on port:' + app.get('port'));
// ================================================================


// ==== socket.io  ===================================
io.on('connection', function (socket) {
    socket.on('Socket message', function (msg) {
        console.log('Socket message: ' + msg);
        socket.emit('barf', 'world')
    });
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});
// ==== socket.io  ===================================