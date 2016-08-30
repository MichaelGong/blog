var fs = require('fs');
var path = require('path');
var logger = require('morgan');
var FileStreamRotator = require('file-stream-rotator');
var logDirectory = path.join(__dirname, 'log');
var accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
});
// 确保log文件夹的存在
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

module.exports = function loggerFunc(app) {
  app.use(logger('combined', { stream: accessLogStream }));
};
