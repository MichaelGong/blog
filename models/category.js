var dbUtil = require('./dbUtil');
var objectId = require('mongodb').ObjectId;

function Category(category) {
  this.name = category.name; // 类别名称
  this.desc = category.desc; // 类别描述
  this.pid = category.pid; // 父类别的id
  this.weight = category.weight; // 排序权重
}

// 获取类别
Category.get = function(cb) {
  dbUtil('category').then(function(collection) {
    collection.collection.find({}).toArray().
    then(function(categories) {
      collection.db.close();
      cb(null, categories);
    }).
    catch(cb);
  }).catch(cb);
};
// 更新类别
Category.prototype.update = function(id, cb) {
  var self = this;
  var categoryTemp = {};
  var field = ['name', 'pid', 'desc', 'weight'];
  field.forEach(function(key) {
    if (self[key]) {
      categoryTemp[key] = self[key];
    }
  });
  categoryTemp.updateTime = new Date().getTime();
  return dbUtil('category').then((collection) => {
    collection.collection.update({
      _id: objectId(id)
    }, {
      $set: categoryTemp
    }).then((err, category) => {
      collection.db.close();
      cb(null, category);
    }).catch(cb);
  }).catch(cb);
};
// 增加类别
Category.prototype.insert = function(cb) {
  var categoryTemp;
  if (!this.name) {
    return cb({ message: '类别名称不能为空！' });
  }
  categoryTemp = {
    name: this.name,
    desc: this.desc,
    pid: this.pid ? this.pid : 0,
    weight: this.weight,
    createTime: new Date().getTime(),
    updateTime: new Date().getTime()
  };
  return dbUtil('category').then((collection) => {
    collection.collection.insert(categoryTemp).then((err, category) => {
      collection.db.close();
      return cb(null, category);
    }).catch(cb);
  }).catch(cb);
};
// 删除类别
Category.delete = function(id, cb) {
  // 删除分类
  dbUtil('category').then((collection) => {
    collection.collection.remove({
      _id: objectId(id)
    }).then((err, data) => {
      collection.db.close();
      cb(null, data);
    }).catch(cb);
  }).catch(cb);

  // 更新文章表内的categoryId
  dbUtil('article').then((collection) => {
    collection.collection.findAndModify({
      _id: objectId(id)
    }, [], {
      $set: { categoryId: '' }
    }, null).then((err, data) => {
      console.log('Category.delete findAndModify err:', err, ' === data:', data);
    }).catch(err => {
      console.log(err);
    });
  }).catch(err => {
    console.log(err);
  });
};
module.exports = Category;
