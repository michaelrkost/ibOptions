const express = require('express');
const router = express.Router();

const app = express();

// CORS enablement
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


/* GET ib listing. */
router.get('/', (req, res) => {
  res.send('router/ib works =)');
});

module.exports = router;
