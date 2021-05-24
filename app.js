const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')



const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//connection database
const { connection } = require('./database')

const homeRouter = require('./routes/home.route');
const goiDichVuRouter = require('./routes/goidichvu.route');
const provincesRouter = require('./routes/provinces.route');
const CTSCaNhanRouter = require('./routes/ctscanhan.route');
const CTSDoanhNghiepRouter = require('./routes/ctsdoanhnghiep.route');
const usersRouter = require('./routes/users.route')
//api
const goiDichVuAPI = require('./routes/api/goidichvu.api');
const tinhThanhAPI = require('./routes/api/provinces.api');
const CTSCaNhanAPI = require('./routes/api/ctscanhan.api');
const CTSDoanhNghiepAPI = require('./routes/api/ctsdoanhnghiep.api');
const usersAPI = require('./routes/api/users.api');

app.use(
  session({
  secret: process.env.KEY,
  name:'token',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge:600000 }
}));

app.use(homeRouter);
app.use(provincesRouter);
app.use(goiDichVuRouter);
app.use(CTSCaNhanRouter)
app.use(CTSDoanhNghiepRouter)
app.use(usersRouter);

//api
app.use('/api', usersAPI);
app.use('/api', tinhThanhAPI);
app.use('/api', goiDichVuAPI)
app.use('/api', CTSCaNhanAPI);
app.use('/api', CTSDoanhNghiepAPI);

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
