var express = require('express');
var router = express.Router();

var app = express();

// CORS enablement -- can we put this in server.js?????
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });


/* GET ib listing. */
router.get('/', (req, res) => {
  res.send('router/ib works =)');
});

module.exports = router;
