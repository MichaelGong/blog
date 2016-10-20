var dbUtil = require('./dbUtil');
var objectId = require('mongodb').objectId;
var collectionName = 'tag';

var Tags = {
  // 获取所有标签
  getAll: function(cb) {
    dbUtil(collectionName).then((obj) => {
      obj.collection.find({}).toArray().
      then((tags) => {
        obj.db.close();
        cb(null, tags);
      }).
      catch(cb);
    }).catch(cb);
  },
  // 删除标签
  deleteTag: function(id, cb) {
    dbUtil(collectionName).then(obj => {
      obj.collection.remove({
        _id: objectId(id)
      }).then(() => {
        obj.db.close();
        cb(null);
      }).catch(cb);
    }).catch(cb);
  },
  // 添加标签
  addTag: function(nameArr, cb) {
    let arrTmp = nameArr.map(item => {
      let obj = {};
      obj.name = item;
      return obj;
    });
    dbUtil(collectionName).then(obj => {
      obj.collection.insertMany(arrTmp).then(() => {
        obj.db.close();
        cb(null);
      }).catch(cb);
    }).catch(cb);
  },
  // 搜索标签，tags格式：'a|b'
  searchTag: function(tags, cb) {
    dbUtil(collectionName).then(obj => {
      obj.collection.find({
        name: { $regex: tags }
      }).toArray().
      then((data) => {
        obj.db.close();
        cb(null, data);
      }).
      catch(cb);
    }).catch(cb);
  },
  // 根据name搜索tag
  findTag: function(name, cb) {
    dbUtil(collectionName).then(obj => {
      obj.collection.findOne({
        name: name
      }).then(result => {
        cb(result);
      }).catch(cb);
    }).catch(cb);
  }
};

module.exports = Tags;
