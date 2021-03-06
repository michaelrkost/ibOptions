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

// Socket.io  ===========================
var io = require('socket.io')(server);
var aString = '';

io.on('connection', function (socket) {
  socket.emit('news', { hello: aString });
  socket.on('message', function (data) {
    console.log('cat' + data);
  }),
    socket.on('ReqStkMktData', function (data) {
      nodeIBServer.reqMktData(
        data.tickerId,                  // tickerId
        nodeIBServer.contract.stock(data.contract),      // Stock
        data.genericTickList,           // genericTickList
        data.snapshot,                  // snapshot                                   
        data.regulatorySnapshot,        // regulatory snapshot
        data.mktDataOptions             // mktDataOptions
      );
      console.log(chalk.bgWhite('ReqStkMktData: ' + data.contract
        + '  tickerId = ' + data.tickerId + '               '));
    });
  //ReqIndexMktData ======================================
      socket.on('ReqIndMktData', function (data) {
        console.log(chalk.bgCyan('ReqIndMktData: ' + data.contract
        + '  tickerId = ' + data.tickerId + '   genericTickList: '
        + data.genericTickList + '               '));

      nodeIBServer.reqMktData(
        data.tickerId,              // tickerId
        nodeIBServer.contract.index(data.contract, ''), // Index
        data.genericTickList,      // genericTickList
        data.snapshot,             // snapshot                                    
        data.regulatorySnapshot,   // regulatory snapshot
        data.mktDataOptions        // mktDataOptions
      );
      console.log(chalk.bgCyan('ReqIndMktData: ' + data.contract
        + '  tickerId = ' + data.tickerId + '               '));
    });

  // emitter.setMaxListeners(n)
  //  By default EventEmitters will print a warning if more than 10 listeners are added to it. 
  //  This is a useful default which helps finding memory leaks.
  //  Obviously not all Emitters should be limited to 10. 
  //  This function allows that to be increased. Set to zero for unlimited.
  //
  // https://nodejs.org/docs/v0.4.7/api/events.html#emitter.setMaxListeners

  nodeIBServer.on('tickPrice', function (tickerId, tickType,
    price, canAutoExecute) {
    socket.emit('tickPrice', {
      tickerId: tickerId,
      tickType: nodeIBServer.util.tickTypeToString(tickType),
      price: price,
      canAutoExecute: canAutoExecute
    }).setMaxListeners(0);
    console.log(chalk.bgBlue('nodeIBServer: tickPrice: ') +
      '%s %s%d %s%d %s%s',
      chalk.yellow(util.format('[%s]', nodeIBServer.util.tickTypeToString(tickType))),
      chalk.bold('tickerId='), tickerId,
      chalk.bold('price='), price,
      chalk.bold('canAutoExecute='), canAutoExecute
    );
  });

    nodeIBServer.on('tickGeneric', function (tickerId, tickType, value){
    socket.emit('tickGeneric', {
      tickerId: tickerId,
      tickType: nodeIBServer.util.tickTypeToString(tickType),
      value: value
    }).setMaxListeners(0);
    console.log(chalk.bgYellow( chalk.cyan('nodeIBServer: tickGeneric: ')) +
    '%s %s%d %s%d',
    chalk.cyan(util.format('[%s]', nodeIBServer.util.tickTypeToString(tickType))),
    chalk.bold('tickerId='), tickerId,
    chalk.bold('value='), value
  );
});

    nodeIBServer.on('tickSize', function (tickerId, sizeTickType, size){
    socket.emit('tickSize', {
      tickerId: tickerId,
      sizeTickType: nodeIBServer.util.tickTypeToString(sizeTickType),
      size: size
    }).setMaxListeners(0);
    console.log(chalk.bgMagenta('nodeIBServer: tickSize: ') +
    '%s %s%d %s%d',
    chalk.cyan(util.format('[%s]', nodeIBServer.util.tickTypeToString(sizeTickType))),
    chalk.bold('tickerId='), tickerId,
    chalk.bold('size='), size
  );
});


});

