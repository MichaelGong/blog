// var mongodb = require('./db');
// var settings = require('../settings');
// var mongodb = require('mongodb');
// var Db = mongodb.Db;

// var Server = mongodb.Server;

// module.exports = function(collectionName, cb, errorCb) {
//   var mongodbInstance = new Db(settings.db,
//     new Server(settings.host, settings.port), { safe: true });
//   mongodbInstance.open(function(err, db) {
//     if (err) {
//       return errorCb(err);
//     }
//     db.collection(collectionName, function(error, collection) {
//       if (error) {
//         mongodbInstance.close();
//         return errorCb(error);
//       }
//       return cb(collection, mongodbInstance);
//     });
//     return true;
//   });
// };
var Promise = require('promise');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/blog';
// var assert = require('assert');
module.exports = function(collectionName) {
  return new Promise(function(resolve, reject) {
    MongoClient.connect(url, function(err, db) {
      db.collection(collectionName, { strict: false }, function(error, collection) {
        if (error) {
          reject(error);
        } else {
          resolve({
            collection: collection,
            db: db
          });
        }
      });
    });
  });
};
