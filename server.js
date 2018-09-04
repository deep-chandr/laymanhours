const express = require('express');
var bodyParser = require('body-parser')

var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
// "dependencies": {
//   "express": "~4.0.0",
//   "static-favicon": "~1.0.0",
//   "morgan": "~1.0.0",
//   "cookie-parser": "~1.0.1",
//   "body-parser": "~1.0.0",
//   "debug": "~0.7.4",
//   "jade": "~1.3.0"
// }

const app = express();
const port = process.env.PORT || 5000;

var routes = require('./routes/index');
var apis = require('./routes/api');


app.use(favicon());
app.use(logger('dev'));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(cookieParser());


app.use('/', routes);
app.use('/api', apis);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
          message: err.message,
          error: err
      });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
      message: err.message,
      error: {}
  });
});


app.listen(port, () => console.log(`Listening on port ${port}`));