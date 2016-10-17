var express = require('express');
var router = express.Router();
var Tags = require('../models/tags');
// 获取所有标签
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
// 添加标签
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
// 搜索标签
router.get('/search', (req, res) => {
  Tags.searchTag(req.query.tags, (err, data) => {
    if (err) {
      res.json({
        code: 500,
        message: err.message,
        data: err
      });
    } else {
      res.json({
        code: 200,
        data: data
      });
    }
  });
});
module.exports = router;
