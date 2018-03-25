var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
var hotel= require('./routes/hotel');

const url = require('url');
const querystring = require('querystring');
var session = require('express-session')

var home = require('./routes/home');
var events = require('./routes/events');
var famousplaces = require('./routes/famousplaces');
var contactus= require('./routes/contactus');
var app = express();

var mySQLDB = require('./Models/my-sql-db');
mySQLDB.openDB();
//mySQLDB.getEvents();

//mySQLDB.closeDB();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// date picker
// const picker = datepicker('.picker-date');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('trust proxy', 1)
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.use(function (req, res, next) {
   res.locals.session = req.session;
   next();
});
app.use('/', home);
app.use('/users', users);

app.use('/hotel', hotel);
app.use('/home', home);
app.use('/events', events);
app.use('/famousplaces', famousplaces);
app.use('/contactus', contactus);

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
