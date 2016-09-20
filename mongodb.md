### mongodb批量更新：
```
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
```
要点在于 `$in` 和 `multi: true`
