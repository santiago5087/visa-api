var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res) {
  const user = req.body.user;
  const pass = req.body.password;
  res.send('respond with a resource');
});

module.exports = router;
