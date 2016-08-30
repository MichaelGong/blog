var mongodb = require('./db');

function User(user) {
  this.name = user.name;
  this.password = user.password;
  this.email = user.email;
}

module.exports = User;

User.prototype.save = function(cb) {
  // 要存入数据库的用户文档
  var user = {
    name: this.name,
    password: this.password,
    email: this.email
  };
  // 打开数据库
  mongodb.open(function(err, db) {
    if (err) {
      return cb(err);
    }
    db.collection('users', function(err, collection) {
      if (err) {
        mongodb.close();
        return cb(err);
      }
      collection.insert(user, {
        safe: true
      }, function(err, user) {
        console.log(user);
        mongodb.close();
        if (err) {
          return cb(err);
        }
        cb(null, user);
      });
    });
  });
};
User.get = function(name, cb) {
  mongodb.open(function(err, db) {
    if (err) {
      return cb(err);
    }
    db.collection('users', function(err, collection) {
      if (err) {
        mongodb.close();
        return cb(err);
      }
      collection.find({
        name: name
      }).toArray(function(err, user) {
        console.log(user);
        mongodb.close();
        if (err) {
          return cb(err);
        }
        cb(null, user);
      });
    });
  });
};
