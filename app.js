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
const giaoDichRouter = require('./routes/giaodich.route');
const loaiCTSRouter = require('./routes/loaicts.route');
const districtsRouter = require('./routes/districts.route');
const CTSCaNhanRouter = require('./routes/ctscanhan.route');
const CTSDoanhNghiepRouter = require('./routes/ctsdoanhnghiep.route');
const usersRouter = require('./routes/users.route')
const trashRouter = require('./routes/trash.route')
const otpRouter = require('./routes/otp.route')
const downloadFileRouter = require('./routes/downloadFile.route');
const reportRouter = require('./routes/report.route');

//api
const giaoDichAPI = require('./routes/api/giaodich.api');
const goiDichVuAPI = require('./routes/api/goidichvu.api');
const tinhThanhAPI = require('./routes/api/provinces.api');
const loaiCTSAPI = require('./routes/api/loaicts.api');
const districtsAPI = require('./routes/api/districts.api');
const CTSCaNhanAPI = require('./routes/api/ctscanhan.api');
const CTSDoanhNghiepAPI = require('./routes/api/ctsdoanhnghiep.api');
const usersAPI = require('./routes/api/users.api');
const trashAPI = require('./routes/api/trash.api');
const reportAPI = require('./routes/api/report.api');
const cors = require('cors')
app.use(cors())
app.use(
  session({
  secret: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { secure:false }
}));
app.use(async (req, res, next) =>{
  try{
      const { connection } = require('./database');
      const User = require('./models/users.model')
      const { userId } = req.session
      if(userId){
          res.locals.user = await User.findOne({_id:userId})                               
      }
      next()
  }
  catch(err){
      console.log(err)
  }
  
})
app.use(homeRouter);
app.use(provincesRouter);
app.use(giaoDichRouter);
app.use(loaiCTSRouter);
app.use(districtsRouter);
app.use(CTSDoanhNghiepRouter);
app.use(goiDichVuRouter);
app.use(CTSCaNhanRouter)
app.use(CTSDoanhNghiepRouter)
app.use(usersRouter);
app.use(trashRouter);
app.use(otpRouter);
app.use(downloadFileRouter);
app.use(reportRouter);
//api
app.use('/api', districtsAPI);
app.use('/api', usersAPI);
app.use('/api', tinhThanhAPI);
app.use('/api', loaiCTSAPI);
app.use('/api', giaoDichAPI);
app.use('/api', goiDichVuAPI);
app.use('/api', CTSCaNhanAPI);
app.use('/api', CTSDoanhNghiepAPI);
app.use('/api', trashAPI);
app.use('/api', reportAPI);

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
