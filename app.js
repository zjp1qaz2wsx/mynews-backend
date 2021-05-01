var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 引入 body-parser
var bodyParser = require('body-parser');

//定义,引用cors
var cors = require('cors');

//创建数据库,加载mongoose
var mongoose = require('mongoose');
mongoose.Promise = global.Promise; //node.js 标准promise
//连接Mongo DB,创建自己的数据库（比如:myshop）
mongoose.connect('mongodb://localhost/mynews', { useFindAndModify: false })
  .then(() => console.log('connect successful!'))
  .catch((err) => console.log(err));


// set Routers' related file
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var newsRouter = require('./routes/news');
var commentsRouter = require('./routes/comments');
var newCommentsRouter = require('./routes/newcomments');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//set route path
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/news', newsRouter);
app.use('/comments', commentsRouter);
app.use('/newcomments', newCommentsRouter);


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
