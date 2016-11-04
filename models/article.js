var dbUtil = require('./dbUtil');
var objectId = require('mongodb').ObjectId;
var collectionName = 'article';

function Article(article) {
  this.title = article.title;
  this.content = article.content;
  this.img = article.img;
  this.tags = article.tags;
  this.createTime = article.createTime;
  this.updateTime = article.updateTime;
  this.readNum = article.readNum;
  this.commentNum = article.commentNum;
  this.categoryId = article.categoryId;
  this.categoryName = article.categoryName;
}
// 获取所有文章
Article.getAll = function(categoryid, tagid, cb) {
  var query = {};
  if (tagid && categoryid) {
    query = {
      tags: {
        $elemMatch: {
          _id: tagid
        }
      },
      categoryId: categoryid
    };
  } else if (tagid && !categoryid) {
    query = {
      tags: {
        $elemMatch: {
          _id: tagid
        }
      }
    };
  } else if (!tagid && categoryid) {
    query = {
      categoryId: categoryid
    };
  }
  dbUtil(collectionName).then((obj) => {
    obj.collection.find(query).toArray().
      then((articles) => {
        obj.db.close();
        cb(null, articles);
      }).
      catch(cb);
  }).catch(cb);
};
// 获取某篇文章
Article.getById = function(id, cb) {
  dbUtil(collectionName).then((obj) => {
    obj.collection.findOne({
      _id: objectId(id)
    }).then((article) => {
      obj.db.close();
      cb(null, article);
    });
  }).catch(cb);
};
// 删除文章 (软删除)
Article.delete = function(idArr, cb) {
  console.log(idArr.map(id => objectId(id)));
  dbUtil(collectionName).then((obj) => {
    obj.collection.update({
      _id: { $in: idArr.map(id => objectId(id)) }
    }, {
      $set: {
        isShow: false
      }
    }, {
      multi: true
    }).then(() => {
      obj.db.close();
      cb(null);
    });
  }).catch(cb);
};
// 更新文章
Article.prototype.update = function(id, cb) {
  let self = this;
  let article = {
    title: self.title,
    content: self.content,
    img: self.img,
    tags: self.tags,
    updateTime: self.updateTime,
    categoryId: self.categoryId,
    categoryName: self.categoryName
  };
  dbUtil(collectionName).then((obj) => {
    obj.collection.findOneAndUpdate({
      _id: objectId(id)
    }, {
      $set: article
    }).then(() => {
      obj.db.close();
      cb(null);
    }).catch(cb);
  }).catch(cb);
};
// 添加文章
Article.prototype.add = function(cb) {
  var self = this;
  var article = {
    title: self.title,
    content: self.content,
    img: self.img,
    tags: self.tags,
    createTime: self.createTime,
    updateTime: self.updateTime,
    readNum: self.readNum,
    commentNum: self.commentNum,
    categoryId: self.categoryId,
    categoryName: self.categoryName
  };
  dbUtil(collectionName).then((obj) => {
    obj.collection.insert(article).
      then(() => {
        obj.db.close();
        cb(null);
      }).catch(cb);
  }).catch(cb);
};
module.exports = Article;
