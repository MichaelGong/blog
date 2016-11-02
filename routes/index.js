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


// router.get('/admin', function(req, res) {
//   console.log('----');
//   if (!req.session.user) {
//     req.session.user = 1;
//   } else {
//     req.session.user = req.session.user + 1;
//   }
//   // res.send('you viewed this page ' + req.session.user + ' times')

//   res.sendfile('./index.html');
// });

// router.get('/bar', function(req, res) {
//   console.log('----2');
//   if (!req.session.user) {
//     req.session.user = 1;
//   } else {
//     req.session.user = req.session.user + 1;
//   }
//   // res.send('you viewed this page ' + req.session.user + ' times')
//   res.sendfile('./index.html');
// });

module.exports = router;
