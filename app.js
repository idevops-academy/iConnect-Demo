var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jsonfile = require('jsonfile');
var loki=require('lokijs');
var indexRouter = require('./routes/index');

var app = express();

//read books from the file
var contacts=jsonfile.readFileSync('./contacts.json');
app.set('contacts',contacts);
//loki implemtation
var db=new loki('contactsdb');
var contactsdb=db.addCollection("contacts")
contactsdb.insert(contacts);
app.set('contactsdb',contactsdb);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/scripts',express.static(path.join(__dirname,'/node_modules/validator')))

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
