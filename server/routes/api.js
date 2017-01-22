var express = require('express');
var router = express.Router();

// CORS enablement -- can we put this in server.js?????
var app = express();
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// For the console
var util = require('util');
var _ = require('lodash');
var chalk = require('chalk');

/* GET api listing. */
router.get('/', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.send("in server: router/api");
  console.log("Request Host Name: "+ req.hostname + ' Path: ' + req.path  + ' Route: ' + req.route);
});

module.exports = router;
