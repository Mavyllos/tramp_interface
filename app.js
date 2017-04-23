var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var rp = require('request-promise');

var index = require('./routes/index');
var users = require('./routes/users');
var hbs = require('hbs');
// var hbsUtils = require(‘hbs-utils’)(hbs);

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
// hbsUtils.registerPartials(path.join(__dirname, ‘views’), {
//  match: /\/?.*_.*\.(html|hbs)$/,
//  name: (name) => {
//    var pathArr = name.split(‘/’)
//    var last = pathArr.length - 1
//    pathArr[last] = pathArr[last].slice(1)
//    var newName = pathArr.join(‘/’)
//
//    return newName
//  }
// })

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
