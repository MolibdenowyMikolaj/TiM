var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('atlassian-jwt');
var moment = require('moment'); // time library for convenience

var index = require('./routes/index');
var user = require('./routes/user');
var history = require('./routes/history');

// **
// Data Base - MySQL, user: api, password: qwerMUSTANG69, database: application

var mysql = require('mysql');
var connection = mysql.createConnection({

    host: '172.23.242.191',
    user: 'api',
    password: 'qwerMUSTANG69',
    database: 'application'

});

connection.connect(function (err) {
    if (err == null)
        console.log('Connected to database');
    else
        console.log(err);
});

exports.connection = connection;

// **

// **
// Authentication - JWT token

var secret = 'machnioPastujeBeret';

exports.encode = function(req, id, login) {
    var now = moment().utc();

    var token = {
        "iss": 'issuer-val',
        "iat": now.unix(),                      // the time the token is generated
        "exp": now.add(3, 'minutes').unix(),    // token expiry time (recommend 3 minutes after issuing)
        "qsh": jwt.createQueryStringHash(req),  // [Query String Hash](https://developer.atlassian.com/static/connect/docs/latest/concepts/understanding-jwt.html#qsh)
        "context": {
            "user": {
                "id": id,
                "login": login
            }
        }
    };


    return jwt.encode(token, secret);
}

exports.decode = function(token) {
    return jwt.decode(token, secret);
}

exports.validate = function(token) {
    if(token)
        return true;
    else
        return false;
}

// **

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', index);
app.use('/user', user);
app.use('/history', history);

app.use('/front', express.static(path.join(__dirname, 'front')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('*', function (req, res) {
    res.sendfile('./index.html');
});

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

var server = app.listen(3001, function () {
    var host = 'localhost';
    var port = server.address().port;
    console.log('App listening at http://%s:%s', host, port);
});

module.exports = app;
