var express = require('express');
var router = express.Router();
var Users = require('../models/users');
var errorCheck = require('../util').errorCheck;

// 获取用户数组
router.get('/getusers', function(req, res) {
  let query = JSON.parse(req.query.search || '{}');
  Users.getUsers(query, function(err, users) {
    if (err) {
      res.json({
        code: 500,
        message: err.message,
        data: err
      });
      return;
    }
    res.json({
      code: 200,
      data: users
    });
  });
});
// 创建用户
router.post('/createuser', function(req, res) {
  if (!req.body.username) {
    return errorCheck(res, '用户名不能为空！');
  }
  if (!req.body.userpassword) {
    return errorCheck(res, '密码不能为空！');
  }
  let user = new Users({
    username: req.body.username,
    userpassword: req.body.userpassword
  });

  return Users.getUsers({
    username: req.body.username
  }, function(err, users) {
    if (err) {
      res.json({
        code: 500,
        message: err.message,
        data: err
      });
      return;
    }
    if (users.length > 0) {
      errorCheck(res, '用户名已存在！');
      return;
    }
    user.create(errData => {
      if (err) {
        res.json({
          code: 500,
          message: errData.message,
          data: errData
        });
        return;
      }
      res.json({
        code: 200,
        data: null
      });
    });
  });
});

module.exports = router;
