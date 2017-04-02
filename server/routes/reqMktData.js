var express = require('express');
var router = express.Router();

// For the console
var util = require('util');
var _ = require('lodash');
var chalk = require('chalk');

// node ib server
var nodeIBServer = require('../nodeIB');

var app = express();

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
  res.send("in server3000 res.send : router/reqMktData - Request Host Name: " + req.hostname  +'\n'
    + 'Path: ' + req.path + '\n'
    + 'Route: ' + req.route + ' Body: ' + req.body + ' ReqParams: ' + req.params.tickerID
    + ' ReqParamsSymbol: ' + req.params.symbolID + ' ReqExchange: ' + req.params.exchangeID);

  console.log("reqNktData = Request Host Name: " + req.hostname + ' Path: ' + req.path
    + ' Route: ' + req.route + ' Body: ' + req.body + ' ReqParamtickerID: ' + req.params.tickerID
    + ' ReqParamsSymbol: ' + req.params.symbolID + ' ReqParamExchange: ' + req.params.exchangeID);

    nodeIBServer.reqMktData(parseInt(req.params.tickerID), 
    nodeIBServer.contract.index(req.params.symbolID, ''), '', false);

    // nodeIBServer.reqMktData(parseInt(req.params.tickerID), 
    // nodeIBServer.contract.stock(req.params.symbolID,req.params.exchangeID, 'USD'), '', false);

 /* nodeIBServer.on('tickPrice', function (tickerId, tickType, price, canAutoExecute) {
    res.send(nodeIBServer.util.tickTypeToString(tickType),
            'tickerIdxxx=', tickerId,
        'pricexxx=', price,
        'canAutoExecutexxx=', canAutoExecute,
        tikID = tickerId,
        tikPriceID = price)});
*/
//res.send("in server3000: router/reqNktData -- tickerID: " + req.params.tickerID);
  
});

router.get('/:tickerID/symbol/:symbolID/exchange/:exchangeID', (req, res) =>{
  res.send("in server3000 --> router/reqNktData <-- tickerID: " + req.params.tickerID);
});

module.exports = router;
