var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var admin = require('firebase-admin');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dashboardRouter = require('./routes/dashboard');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var accountRouter = require('./routes/account');
var driversRouter = require('./routes/drivers');
var vehiclesRouter = require('./routes/vehicles');
var tripsRouter = require('./routes/trips');

var serviceAccount = require('./dolly-e7b16-firebase-adminsdk-v6f4l-b15c41058b');
var firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://dolly-e7b16.firebaseio.com/'
});
var database = firebaseAdmin.database();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(__dirname + '/public'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dashboard', dashboardRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/account', accountRouter);
app.use('/drivers', driversRouter);
app.use('/vehicles', vehiclesRouter);
app.use('/trips', tripsRouter);

bodyParser = require('body-parser').json();
app.post('/test', bodyParser, function(req, res) {
    var angle = req.body.angle;
    var id = req.body.id;
    var lat = req.body.lat;
    var lng = req.body.lng;

    function writeUserData(angle, id, latitude, longitude) {
        firebaseAdmin.database().ref('/').push({
            angle: angle,
            id: id,
            lat: latitude,
            lng: longitude
        });
    }

    writeUserData(angle, id, lat, lng);
    
    var data = [angle, id, lat, lng];
    res.status(200).send(data);
});

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
