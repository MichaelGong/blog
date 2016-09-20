var express = require('express');
var router = express.Router();
var objectId = require('mongodb').ObjectId;
var Article = require('../models/article');

function errorCheck(res, message) {
  return res.json({
    code: 400,
    message: message,
    data: null
  });
}
// 获取所有文章
router.get('/getAll', function(req, res) {
  var categoryId = req.query.categoryid;
  var tagId = req.query.tagid;
  if (!req.query.categoryid || req.query.categoryid === 'undefined') {
    categoryId = '';
  }
  if (!req.query.tagid || req.query.tagid === 'undefined') {
    tagId = '';
  }
  Article.getAll(categoryId, tagId, function(err, articles) {
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
      data: articles
    });
  });
});
// 新增文章
router.post('/add', function(req, res) {
  var article;
  var timeStamp;
  if (!req.body.title) {
    errorCheck(res, '文章标题不能为空！');
    return;
  } else if (!req.body.content) {
    errorCheck(res, '文章内容不能为空！');
    return;
  } else if (!req.body.tags || req.body.tags.length === 0) {
    errorCheck(res, '请至少添加一个标签！');
    return;
  } else if (!req.body.categoryId) {
    errorCheck(res, '请选择一个分类！');
    return;
  }
  timeStamp = new Date().getTime();
  article = new Article({
    title: req.body.title,
    content: req.body.content,
    img: req.body.img,
    tags: JSON.parse(req.body.tags),
    createTime: timeStamp,
    updateTime: null,
    readNum: 0,
    commentNum: 0,
    categoryId: req.body.categoryId
  });
  article.add(function(err) {
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

// 根据文章id查询文章具体内容
router.get('/getById', function(req, res) {
  var id = req.query.id;
  if (!id) {
    errorCheck(res, '文章id不能为空');
  }
  Article.getById(id, function(err, infos) {
    if (err) {
      res.json({
        code: 400,
        message: err.message,
        data: err
      });
      return;
    }
    // infos.content = marked(testMD);
    res.json({
      code: 200,
      data: infos
    });
  });
});

router.post('/delete', function(req, res) {
  if (!req.body.idArr) {
    errorCheck(res, '请传入文章id');
  }
  req.body.idArr.forEach(function(item) {
    if (!objectId.isValid(item)) {
      return errorCheck(res, '文章id不合法！');
    }
    return '';
  });

  Article.delete(req.body.idArr, function(err) {
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


module.exports = router;
