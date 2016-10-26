/* eslint-disable new-cap */
var express = require('express');
var router = express.Router();

// router.use('/admin', function(req, res, next) {
//   // if (req.session)
//   console.log(req.session);
// });

router.get('/*', function(req, res) {
  // res.render('index');
  res.sendfile('./index.html');
});

module.exports = router;
