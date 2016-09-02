var express = require('express');
var router = express.Router();
var qiniu = require('qiniu');
var bucket = 'gonghao-blog';

qiniu.conf.ACCESS_KEY = '1h98FqNUWwPoZB5G6kT93OCAkphoCNvKW73H-a-4';
qiniu.conf.SECRET_KEY = 'DKkG2mQE6UwOlwoGfjzqv9_fkUEvSdIE97DNcKV2';


router.get('/getUptoken', function(req, res) {
  res.json({
    code: 200,
    data: {
      uptoken: new qiniu.rs.PutPolicy(bucket).token()
    }
  });
});

module.exports = router;
