var express = require('express');
var router = express.Router();
var app = express();


// For the console
var util = require('util');
var _ = require('lodash');
var chalk = require('chalk');

// node ib server
var nodeIBServer = require('../nodeIB');

// ==== socket.io Server setup  ===================================
var server = require('http');
app.set('port', process.env.PORT || 7777);
server.createServer(app).listen(app.get('port'));
var io = require('socket.io')(server);
console.log('Express HTTP server for Socket.io listening on port:' + app.get('port'));
// ================================================================


// ======= Request Market Data =======================================
// ib = node ib server
// ib.reqMktData(tickerId, contract, genericTickList, snapshot)
//  Future
//      ib.reqMktData(25, ib.contract.future('ES', '201712', 'USD', 'GLOBEX'), '', false);
//      ib.contract.future(symbol, expiry, currency, exchange)
//  Option
//      ib.reqMktData(21, ib.contract.option('AAPL', '201712', 200, 'C'), '', false);
//      ib.contract.option(symbol, expiry, strike, right, exchange, currency)
//  Stock
//      ib.reqMktData(11, ib.contract.stock('AAPL'), '', false);
//      ib.contract.stock(symbol, exchange, currency)
//  Forex
//      ib.reqMktData(1, ib.contract.forex('EUR'), '', false);
//      ib.contract.forex(symbol, currency)
// ======= Example ====================================================
// nodeIBServer.reqMktData(parseInt(req.params.tickerID),
//   nodeIBServer.contract.stock(req.params.symbolID), '', true);

router.get('/:tickerID/symbol/:symbolID/exchange/:exchangeID', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  console.log("reqNktData = Request Host Name: " + req.hostname + ' Path: ' + req.path
    + ' Route: ' + req.route + ' Body: ' + req.body + ' ReqParamtickerID: ' + req.params.tickerID
    + ' ReqParamsSymbol: ' + req.params.symbolID + ' ReqParamExchange: ' + req.params.exchangeID);

  nodeIBServer.reqMktData(parseInt(req.params.tickerID),
    nodeIBServer.contract.index(req.params.symbolID, ''), '', false);

// ==== socket.io  ===================================
  // io.on('connection', function (socket) {
  //   socket.emit('news', { hello: 'world' });
  //   socket.on('my other event', function (data) {
  //     console.log(data);
  //   });
  // });
// ==== socket.io  ===================================

  res.send("Connected! ID# " + req.params.tickerID);

});

module.exports = router;
