var dbUtil = require('./dbUtil');
var objectId = require('mongodb').ObjectId;

function Info(info) {
  this.oneWord = info.oneWord; // 一句话
  this.headpic = info.headpic; // 头像
  this.recommendTags = info.recommendTags; // 推荐标签
}
// 更新基本信息
Info.prototype.update = function(id, cb) {
  var self = this;
  var infoTemp = {};
  var field = ['oneWord', 'headpic', 'recommendTags'];
  field.forEach(function(key) {
    if (self[key]) {
      infoTemp[key] = self[key];
    }
  });
  dbUtil('info').then(function(collection) {
    collection.collection.update({
      _id: objectId(id)
    }, {
      $set: infoTemp
    }).then(function(info) {
      collection.db.close();
      return cb(null, info);
    }).catch(cb);
  }).catch(cb);
};
Info.getAll = function(cb) {
  dbUtil('info').then(function(collection) {
    collection.collection.findOne({}).then(function(info) {
      collection.db.close();
      return cb(null, info);
    }).catch(cb);
  }).catch(cb);
};

module.exports = Info;
