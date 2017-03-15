var express = require('express');
var router = express.Router();
// For the console

var chalk = require('chalk');

var nodeIBServer =  require('../nodeIB');

var app = express();

router.get('/:tickerID/symbol/:symbolID', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.send("in server3000: router/reqNktData -- tickerID: "+ req.params.tickerID);
    // res.send("in server3000: router/api -- *~=)");
  console.log("reqNktData = equest Host Name: "+ req.hostname + ' Path: ' + req.path
  + ' Route: ' + req.route + ' Body: '+ req.body + ' ReqParams: ' + req.params.tickerID
  + ' ReqParamsSymbol: ' + req.params.symbolID);

 nodeIBServer.reqMktData(parseInt(req.params.tickerID), 
       nodeIBServer.contract.stock(req.params.symbolID), '', false);

});

module.exports = router;
