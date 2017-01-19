const express = require('express');
const router = express.Router();

/* GET ib listing. */
router.get('/', (req, res) => {
  res.send('router/ib works =)');
});

module.exports = router;
