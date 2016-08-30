/* eslint-disable */
var express = require('express');
var app = express();
var path = require('path');
var ejs = require('ejs');
var favicon = require('serve-favicon');
// var settings = require('./settings');
// var session = require('express-session');
var bodyParser = require('body-parser');
// var MongoStore = require('connect-mongo')(session);
var DashboardPlugin = require('webpack-dashboard/plugin');

var loggerFunc = require('./logger');
var routes = require('./routes/index');
var category = require('./routes/category');
var info = require('./routes/info');
var tags = require('./routes/tags');
var article = require('./routes/article');
var server;

var NODE_ENV = process.env.NODE_ENV || 'development';
var isDev = NODE_ENV === 'development';

// webpack打包
if (isDev) {
  var webpack = require('webpack');
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var webpackDevConfig = require('./webpack.config.js');

  var compiler = webpack(webpackDevConfig);
  compiler.apply(new DashboardPlugin());
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
    noInfo: true,
    stats: {
      colors: true
    },
    quiet: true
  }));

  app.use(webpackHotMiddleware(compiler));
}

// 设置views路径和模板
app.set('views', './');
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);


app.use(favicon(path.join(__dirname, './favicon.ico')));
// logger
loggerFunc(app);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
// parse application/json
app.use(bodyParser.json({ limit: '50mb' }));
// 静态文件
app.use('/client/dist', express.static(path.join(__dirname, 'client/dist')));
// app.use('/', express.static(path.join(__dirname, '/')));

app.use('/view', routes);
app.use('/category', category);
app.use('/info', info);
app.use('/tags', tags);
app.use('/article', article);

// 404
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  // res.render('404');
  res.redirect('/view');
  // next(err);
});
// error
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
  next();
});


// app.use(session({
//   secret: settings.cookieSecret,
//   key: settings.db,
//   cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 }, // 30天
//   store: new MongoStore({
//     db: settings.db,
//     host: settings.host,
//     port: settings.port,
//     url: 'mongodb://localhost/blog'
//   })
// }));


// 启动服务器
server = app.listen(8989, function() {
  var port = server.address().port;
  console.log('Listening at http://localhost:%s', port);
});
