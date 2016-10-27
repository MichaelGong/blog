var dbUtil = require('./dbUtil');
var objectId = require('mongodb').objectId;
var collectionName = 'users';

function Users(info) {
  this.username = info.username;
  this.userpassword = info.userpassword;
  this.canuse = false;
}

Users.getUsers = function(opts, cb) {
  dbUtil(collectionName).then(obj => {
    obj.collection.find(opts).toArray().then(users => {
      obj.db.close();
      cb(null, users);
    })
    .catch(cb);
  }).catch(cb);
};

// 创建用户
Users.prototype.create = function(cb) {
  var self = this;
  var temp = {};
  var field = ['username', 'userpassword', 'canuse'];
  field.forEach(function(key) {
    if (self[key]) {
      temp[key] = self[key];
    }
  });
  dbUtil(collectionName).then((obj) => {
    obj.collection.insert(temp).then(() => {
      obj.db.close();
      cb(null);
    }).catch(cb);
  }).catch(cb);
};
module.exports = Users;
