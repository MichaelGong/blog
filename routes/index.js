/* eslint-disable new-cap */
var express = require('express');
var router = express.Router();

router.get('/*', function(req, res) {
  // res.render('index');
  res.sendfile('./index.html');
});

module.exports = router;
