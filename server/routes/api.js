const express = require('express');
const router = express.Router();

const API = 'http://localhost:3000/ib'

/* GET api listing. */
router.get('${API}/ib', (req, res) => {
  res.send('routers/api works');
});

module.exports = router;
