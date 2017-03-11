var express = require('express');
var router = express.Router();
var ibNode1 = require('../nodeIB');


var tikPrice = 'x';
var tikID = 'x';


var app = express();

router.get('/', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.send("in server3000: router/api -- *~=)", ibNode1.tikID);
    // res.send("in server3000: router/api -- *~=)");
  console.log("Request Host Name: "+ req.hostname + ' Path: ' + req.path
  + ' Route: ' + req.route + ' Body: '+ req.body);
});

module.exports = router;
