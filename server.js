var express = require('express');
var app = express();
app.use(express.bodyParser());

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);

app.configure(function(){
  app.use('/css', express.static(__dirname + '/assets/css'));
  app.use('/js', express.static(__dirname + '/assets/js'));
  app.use('/view', express.static(__dirname + '/assets/view'));
  app.use('/img', express.static(__dirname + '/assets/img'));
  app.use(express.static(__dirname + '/app'));
});

app.listen(3000);
