// load .env data into process.env
require("dotenv").config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const logger = require('morgan');

//Routes
const gameRouter = require('./routes/gameRouter');
const teachersRouter = require('./routes/teachersRouter');

const app = express();
// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db');
const db = new Pool(dbParams);
db.connect();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//midleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
  name: 'user-session',
  keys: ['a5376b06-97bf-4159-b737-22642a995dd4', '16aefe91-9211-4a1b-a9dc-fc738bf89e6f']
}));

//endpoint helpers
const teacherHelpers = require('./helpers/teacherHelpers')(db);
const gameHelpers = require('./helpers/gameHelpers')(db);
//endpoints
app.use('/games', gameRouter(gameHelpers));
app.use('/', teachersRouter(teacherHelpers));

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
