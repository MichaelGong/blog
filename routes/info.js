var express = require('express');
var router = express.Router();
var Info = require('../models/info');

router.get('/get', function(req, res) {
  return Info.getAll(function(err, info) {
    if (err) {
      res.json({
        code: 400,
        message: err.message,
        data: err
      });
      return;
    }
    res.json({
      code: 200,
      data: info
    });
  });
});

module.exports = router;
