var express = require('express');
var router = express.Router();
var app = express();

  console.log("In reqSocketData!!!");

// For the console
var util = require('util');
var _ = require('lodash');
var chalk = require('chalk');


router.get('/', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  console.log("=============In reqSocketData!!!============");

  res.send("Connected! reqSocketData" );

});

module.exports = router;
