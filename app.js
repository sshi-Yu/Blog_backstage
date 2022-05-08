var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

const db = require('./db/connect')
const visit_logs = require('./db/visit_logs')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var routeAuthRouter = require('./routes/routeAuth');
var articleRouter = require('./routes/articles');

var app = express();

/* 验证token */
const {
  verify_token
} = require('./jwt/index')
// 设置需要验证的接口
const auditList = ['/routeAuth/updateRoutes']
app.use((req, res, next) => {

  visit_logs.insertMany({
    visitorIP: req.socket.remoteAddresss
  },(err,doc)=>{})

  if (auditList.includes(req.url)) { // 访问接口在需要验证的接口列表内 验证accessToken
    verify_token(req.headers.token)
      .then(res => {
        next()
      })
      .catch(err => {
        res.json({
          code: 4001,
          msg: 'Invalid Token'
        })
      })
  } else {
    next()
  }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/routeAuth', routeAuthRouter);
app.use('/article', articleRouter);

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