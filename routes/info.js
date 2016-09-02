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
// 更新
router.post('/update', function(req, res) {
  var info;
  if (!req.body.id) {
    res.json({
      code: 400,
      message: 'id不能为空',
      data: null
    });
  }
  info = new Info({
    oneWord: req.body.signature,
    headpic: req.body.headpic
  });
  info.update(req.body.id, function(err, message) {
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
      data: message
    });
  });
});
module.exports = router;
