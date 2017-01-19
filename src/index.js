var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var app = express();

var log = require('node-express-logger');
log.config({
  logFilePath: './log/',
  logFileName: 'log'
})

// view engine setup
app.set('views', path.join(__dirname, 'template'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

// var CONFIG = require('config');
// session
// app.use(session({
//   store: new RedisStore({
//     host:             CONFIG.get("redis.store.host"),
//     port:             CONFIG.get("redis.store.port"),
//     pass:             CONFIG.get("redis.store.pass"),
//     ttl:              CONFIG.get("redis.store.ttl"), //redis过期时长 秒为单位
//     db:               CONFIG.get("redis.store.db"), // redis DB index
//     prefix:           CONFIG.get("redis.store.prefix") // session redis 前缀
//   }),
//   cookie: {
//     domain:           CONFIG.get("redis.cookie.domain"),
//     maxAge:           CONFIG.get("redis.cookie.maxAge")//cookie过期时长  毫秒为单位
//   },
//   resave:             CONFIG.get("redis.resave"),
//   saveUninitialized:  CONFIG.get("redis.saveUninitialized"),
//   secret:             CONFIG.get("redis.secret"),
// }));

app.use(session({
    secret: '12345',
    name: 'blog',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 1200000000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,
}));


var ueditor = require("./server/util/ueditor");
app.use("/static/ueditor/ue", ueditor(path.join(__dirname, 'build'), function (req, res, next) {
    //客户端上传文件设置
     var ActionType = req.query.action;
    if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo') {
        var file_url = '/img/ueditor/';//默认图片上传地址
        /*其他上传格式的地址*/
        if (ActionType === 'uploadfile') {
            file_url = '/file/ueditor/'; //附件
        }
        if (ActionType === 'uploadvideo') {
            file_url = '/video/ueditor/'; //视频
        }
        res.ue_up(file_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
        res.setHeader('Content-Type', 'text/html');
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = '/images/ueditor/';
        res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
    }
    // 客户端发起其它请求
    else {
        // console.log('config.json')
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/static/ueditor/nodejs/config.json');
    }
}));


require('./server/routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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


module.exports = app;
