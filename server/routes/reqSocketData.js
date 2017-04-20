var express = require('express');
var router = express.Router();
var app = express();


// For the console
var util = require('util');
var _ = require('lodash');
var chalk = require('chalk');


// router.get('/:tickerID/symbol/:symbolID/exchange/:exchangeID', (req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

//   console.log("reqNktData = Request Host Name: " + req.hostname + ' Path: ' + req.path
//     + ' Route: ' + req.route + ' Body: ' + req.body + ' ReqParamtickerID: ' + req.params.tickerID
//     + ' ReqParamsSymbol: ' + req.params.symbolID + ' ReqParamExchange: ' + req.params.exchangeID);

//   nodeIBServer.reqMktData(parseInt(req.params.tickerID),
//     nodeIBServer.contract.index(req.params.symbolID, ''), '', false);

//   res.send("Connected! ID# " + req.params.tickerID);

// });

module.exports = router;
