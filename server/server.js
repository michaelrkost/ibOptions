// Get dependencies
var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var ibNode1 = require('./nodeIB');


// For the console
var util = require('util');
var _ = require('lodash');
var chalk = require('chalk');

console.log('\n' + chalk.bgGreen(">>>>> in ./server/server <<<<<<"));

// Get our API routes
var reqMktData = require('./routes/reqMktData');

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
app.use('/reqMktData/ticker', reqMktData);

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`Express app Server listening on port:${port}`));
