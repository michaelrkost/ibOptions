var express = require('express');
var router = express.Router();
var app = express();

// node ib server
var nodeIBServer = require('../nodeIB');

console.log("In reqSocketData!!!");

// For the console
var util = require('util');
var _ = require('lodash');
var chalk = require('chalk');


router.get('/', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  console.log("=============In reqSocketData!!!============");
  nodeIBServer.reqMktData(1500, nodeIBServer.contract.index('SPX', ''), '', false);
  var count =1;
  var aString = '';
  nodeIBServer.on('tickPrice', function (tickerId, tickType,
    price, canAutoExecute) {
      aString = price

    console.log('Price:  ' + aString + ' Count:  ' + count++);

    res.json({ 'price': aString });
  });
  // res.json(aString);
  // nodeIBServer.on('tickPrice', function (tickerId, tickType, 
  // price, canAutoExecute) {JSON.stringify(price)
  // console.log(
  //   '%s %s%d %s%d %s%s',
  //   chalk.cyan(util.format('[%s]', ib.util.tickTypeToString(tickType))),
  //   chalk.bold('tickerId='), tickerId,
  //   chalk.bold('price='), price,
  //   chalk.bold('canAutoExecute='), canAutoExecute
  // )
});

module.exports = router;
