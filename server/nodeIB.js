// For the console
var util = require('util');
var _ = require('lodash');
var chalk = require('chalk');

var tikPrice = 'x';
var tikID = 'x';

console.log(chalk.bgGreen(">>>>> in ./server/node-ib <<<<<<"));

var ib = new (require('ib'))({
  clientId: 4,
  host: '127.0.0.1',
  port: 7495
}).on('error', function (err) {
  console.error(chalk.red(err.message));
}).on('result', function (event, args) {
  if (!_.includes(['tickEFP', 'tickGeneric', 'tickOptionComputation', 'tickPrice',
                   'tickSize', 'tickString'], event)) {
    console.log('%s %s', chalk.yellow(event + ':'), JSON.stringify(args));
  }
}).on('tickEFP', function (tickerId, tickType, basisPoints, formattedBasisPoints,
                           impliedFuturesPrice, holdDays, futureExpiry, dividendImpact,
                           dividendsToExpiry) {
  console.log(
    '%s %s%d %s%d %s%s %s%d %s%d %s%s %s%d %s%d',
    chalk.cyan(util.format('[%s]', ib.util.tickTypeToString(tickType))),
    'tickerId=', tickerId,
    'basisPoints=', basisPoints,
    'formattedBasisPoints=', formattedBasisPoints,
    'impliedFuturesPrice=', impliedFuturesPrice,
    'holdDays=', holdDays,
    'futureExpiry=', futureExpiry,
    'dividendImpact=', dividendImpact,
    'dividendsToExpiry=', dividendsToExpiry
  );
}).on('tickGeneric', function (tickerId, tickType, value) {
  console.log(
    '%s %s%d %s%d',
    chalk.cyan(util.format('[%s]', ib.util.tickTypeToString(tickType))),
    'tickerId=', tickerId,
    'value=', value
  );
}).on('tickOptionComputation', function (tickerId, tickType, impliedVol, delta, optPrice,
                                         pvDividend, gamma, vega, theta, undPrice) {
  console.log(
    '%s %s%d %s%s %s%s %s%s %s%d %s%s %s%s %s%s %s%d',
    chalk.cyan(util.format('[%s]', ib.util.tickTypeToString(tickType))),
    'tickerId=', tickerId,
    'impliedVol=', ib.util.numberToString(impliedVol),
    'delta=', ib.util.numberToString(delta),
    'optPrice=', ib.util.numberToString(optPrice),
    'pvDividend=', pvDividend,
    'gamma=', ib.util.numberToString(gamma),
    'vega=', ib.util.numberToString(vega),
    'theta=', ib.util.numberToString(theta),
    'undPrice=', undPrice
  );
}).on('tickPrice', function (tickerId, tickType, price, canAutoExecute) {
  console.log(
    '%s %s%d %s%d %s%s',
    chalk.cyan(util.format('[%s]', ib.util.tickTypeToString(tickType))),
    'tickerId=', tickerId,
    'price=', price,
    'canAutoExecute=', canAutoExecute,
    tikID = tickerId,
    tikPriceID = price
  );
}).on('tickSize', function (tickerId, sizeTickType, size) {
  console.log(
    '%s %s%d %s%d',
    chalk.cyan(util.format('[%s]', ib.util.tickTypeToString(sizeTickType))),
    'tickerId:', tickerId,
    'size:', size
  );
}).on('tickString', function (tickerId, tickType, value) {
  console.log(
    '%s %s%d %s%s',
    chalk.cyan(util.format('[%s]', ib.util.tickTypeToString(tickType))),
    'tickerId=', tickerId,
    'value=', value
  );
});

ib.connect()


// Stock
ib.reqMktData(11, ib.contract.stock('AAPL'), '', false);
ib.reqMktData(12, ib.contract.stock('AMZN'), '', false);
ib.reqMktData(13, ib.contract.stock('GOOG'), '', false);
ib.reqMktData(14, ib.contract.stock('FB'), '', false);
