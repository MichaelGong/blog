var express = require('express');
var router = express.Router();
var objectId = require('mongodb').ObjectId;
var Category = require('../models/category');
var errorCheck = require('../util').errorCheck;
// 该路由使用的中间件
// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', new Date());
//   next();
// });
// 获取所有类别
router.get('/getAll', function(req, res) {
  Category.get(function(err, categories) {
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
      data: categories
    });
  });
});
// 更新类别
router.post('/update', function(req, res) {
  var category;
  if (!objectId.isValid(req.body.id)) {
    errorCheck(res, '类别id不合法！');
    return;
  }
  if (!req.body.name) {
    errorCheck(res, '请输入类别名称');
    return;
  } else if (!req.body.desc) {
    errorCheck(res, '请输入类别描述');
    return;
  }
  category = new Category({
    name: req.body.name,
    desc: req.body.desc,
    pid: req.body.pid
  });
  category.update(req.body.id, function(err) {
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
      data: {}
    });
  });
});
// 添加类别
router.post('/add', function(req, res) {
  var category;
  if (!req.body.name) {
    res.json({
      code: 400,
      message: '类别名称不能为空！',
      data: null
    });
  } else if (!req.body.desc) {
    res.json({
      code: 400,
      message: '类别描述不能为空！',
      data: null
    });
  } else {
    Category.get(function(err, categories) {
      if (categories.filter(item => item.name === req.body.name).length > 0) {
        res.json({
          code: 400,
          message: '类别名称已经存在了！',
          data: null
        });
      } else {
        category = new Category({
          name: req.body.name,
          pid: req.body.pid ? req.body.pid : 0
        });
        category.insert(function(error) {
          if (error) {
            res.json({
              code: 400,
              message: error.message,
              data: error
            });
            return;
          }
          res.json({
            code: 200,
            data: {}
          });
        });
      }
    });
  }
});

module.exports = router;
