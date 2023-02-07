const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

// Enrutado
const indexRouter = require('./routes/index');
const usuariosRouter = require('./routes/usuarios');
const reservasRouter = require('./routes/reservas');
const pistasRouter = require('./routes/pistas');
const equipamientosRouter = require('./routes/equipamientos');

// Base de datos
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_URI,)
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));
mongoose.connection;

const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);
app.use('/reservas', reservasRouter);
app.use('/pistas', pistasRouter);
app.use('/equipamientos', equipamientosRouter);

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