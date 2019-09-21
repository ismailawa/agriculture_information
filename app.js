var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var app = express();
// const multer = require('multer');

mongoose.connect('mongodb://localhost:27017/agricdb', { useUnifiedTopology: true, useNewUrlParser: true });

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Acess-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  next();
});


const indexRouter = require('./routes/index');
const usersRouter = require('./api/routes/users');
const videosRouter = require('./api/routes/videos');
const shopsRouter = require('./api/routes/shops');
const productsRouter = require('./api/routes/products');
const categoriesRouter = require('./api/routes/categories');
const subcategoriesRouter = require('./api/routes/subcategories');
const classesRouter = require('./api/routes/classes');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.use(multer({ storage: fileStorage }).single("iamge"))
app.use(logger('dev'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/videos', videosRouter);
app.use('/api/users', usersRouter);
app.use('/api/shops', shopsRouter);
app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/sub-categories', subcategoriesRouter);
app.use('/api/classes', classesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
