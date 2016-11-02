var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var Users = require('../models/users');
var errorCheck = require('../util').errorCheck;

function md5(text) {
  return crypto.createHash('md5').update(text + 'gh-blog').digest('hex');
}
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

// 校验用户名密码是否匹配
router.post('/checkuser', (req, res) => {
  console.log(req.session, '=======================');
  let query = {
    username: req.body.username,
    userpassword: md5(req.body.userpassword)
  };
  let id = '_id';
  Users.getUsers(query, (err, users) => {
    if (err) {
      res.json({
        code: 500,
        message: err.message,
        data: err
      });
      return;
    }
    if (users.length > 0 && users[0].canuse) {
      req.session.userId = users[0][id];
      console.log('checkuser:-------------------:', req.session);
      res.json({
        code: 200,
        data: users
      });
    } else {
      console.log('----4');
      req.session.userId = null;
      console.log('checkuser:-------------------:', req.session);
      errorCheck(res, '用户名或密码错误', 500);
    }
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
    userpassword: md5(req.body.userpassword)
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
