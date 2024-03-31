var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser  = require('body-parser');
var morgan = require('morgan');
var fs = require('fs')
var rfs = require('rotating-file-stream')
const morganJson = require('morgan-json');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var reviewRouter = require('./routes/reviews');
var catalogRouter = require('./routes/catalog');
var orderRouter = require('./routes/order');
var adminRouter = require('./routes/admin');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(process.cwd(), 'files', 'log', 'logfile.log'), { flags: 'a' })
const formatLog = morganJson({
  method: ':method',
  url: ':url',
  status: ':status ',
  responseTime: ':response-time',
})
// setup the logger
app.use(morgan(formatLog, { 
  stream: accessLogStream,
  skip: (req, res) => {
    return req.originalUrl.endsWith('.png') 
    || req.originalUrl.endsWith('.svg') 
    || req.originalUrl.endsWith('.css')  
    || req.originalUrl.endsWith('.js')  
    || req.originalUrl.endsWith('.jpg')
    || req.originalUrl.endsWith('.JPEG')
    || req.originalUrl.endsWith('.JPG')
    || req.originalUrl.endsWith('.xml')
  }
}))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public', 'front')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/reviews', reviewRouter);
app.use('/catalog', catalogRouter);
app.use('/order', orderRouter);
app.use('/admin', adminRouter);

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

module.exports = app;
