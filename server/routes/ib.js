var express = require('express');
var router = express.Router();

var app = express();

router.get('/', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.send("in server3000: router/ib");
  console.log("Request Host Name: "+ req.hostname + ' Path: ' + req.path
  + ' Route: ' + req.route + ' Body: '+ req.body);
});

module.exports = router;
