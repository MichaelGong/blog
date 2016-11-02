var express = require('express');
var router = express.Router();

router.get('/*', function(req, res, next) {
  if (req.url === '/login') {
    next();
    // res.render('index');
    return;
  }
  if (req.session.userId) {
    // res.redirect('/admin/info');
    res.render('index');
    return;
  }
  res.redirect('/admin/login');
});

router.get('/login', function(req, res) {
  res.render('index', {
    session: JSON.stringify(req.session)
  });
});


module.exports = router;
