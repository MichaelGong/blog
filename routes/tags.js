var express = require('express');
var router = express.Router();
var Tags = require('../models/tags');

router.get('/get', function(req, res) {
  return Tags.getAll(function(err, tags) {
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
      data: tags
    });
  });
});

router.post('/add', (req, res) => {
  if (!req.body.name) {
    res.json({
      code: 400,
      message: '请输入标签名称！',
      data: null
    });
    return;
  }
  Tags.addTag(req.body.name, (err) => {
    if (err) {
      res.json({
        code: 400,
        message: err.message,
        data: err
      });
    } else {
      res.json({
        code: 200,
        message: '添加成功',
        data: {}
      });
    }
  });
});

module.exports = router;
