'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const rp = require('request-promise');
const cookieSession = require('cookie-session');


const index = require('./routes/index');
const users = require('./routes/users');
const companies = require('./routes/companies');
const dogs = require('./routes/dogs');
const owners = require('./routes/owners');
const walkers = require('./routes/walkers');
const session = require('./routes/session');
const session2 = require('./routes/session2');
const hbs = require('hbs');
const hbsUtils = require('hbs-utils')(hbs);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(methodOverride('_method'));
app.use(favicon(path.join(__dirname, 'public', 'images', 'paw-print-512.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

hbsUtils.registerPartials(path.join(__dirname, 'views'), {
 match: /\/?.*_.*\.(html|hbs)$/,
 name: (name) => {
   var pathArr = name.split('/')
   var last = pathArr.length - 1
   pathArr[last] = pathArr[last].slice(1)
   var newName = pathArr.join('/')

   return newName
 }
})


app.use(cookieSession({
  name: 'tramp_interface',
  secret: process.env.SESSION_SECRET
}));

app.use('/', index);
app.use('/companies', companies);
app.use('/dogs', dogs);
app.use('/owners', owners);
app.use('/users', users);
app.use('/walkers', walkers);
app.use('/session',session);
app.use('/session2',session2);


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
