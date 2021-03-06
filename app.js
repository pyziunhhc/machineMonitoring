/*DODAWANIE PAKIETOW*/
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const fs = require('fs');
const compression = require('compression');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);

const {
  removeLoggedUsers,
} = require('./helpers/background/removeLoggedUsers')
const {
  sendEmails,
} = require('./helpers/background/sendEmails')


/*LACZENIE Z BAZA*/
mongoose.connect('mongodb://localhost:27017/monitoring', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then()
  .catch(error => console.log(error))
mongoose.connection.on('connected', () => {
  console.log('Connected to database')
})
/*TRASY */
const loginRouter = require('./routes/auth/login');
const logoutRouter = require('./routes/auth/logout');
const usersRouter = require('./routes/users');
const dashboardRouter = require('./routes/dashboard');
const monitoringRouter = require('./routes/monitoring');
const machinesRouter = require('./routes/machines');
const settingsRouter = require('./routes/menu');
const reportsRouter = require('./routes/reports');
const dataRouter = require('./routes/data');
const operatorRouter = require('./routes/operator');
const statsRouter = require('./routes/stats');
const tasksRouter = require('./routes/tasks');
const notificationRouter = require('./routes/notification')

/*LADOWANIE ZALEZNOSCI */


const corsOption = {
  origin: (origin, callback) => {

    callback(null, origin)
  },
  credentials: true
}
app.use(compression())
app.use(cors(corsOption))
app.use(morgan('dev'));
app.use(morgan('combined', {
  stream: fs.createWriteStream(path.join(`${__dirname}/logs`, `access${new Date().toLocaleDateString()}.log`), {
    flags: 'a'
  })
}));
app.use(cookieParser());
app.use(express.json({ //problem z payloadem był przez użycie bodyParser.json
  limit: 52428800,
  extended: true,
  parameterLimit: 52428800
}))
app.use(express.urlencoded({
  limit: 52428800,
  extended: true,
  parameterLimit: 52428800
}))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));


app.use('/data', dataRouter)
app.use('/dashboard', dashboardRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/api', settingsRouter);
app.use('/reports', reportsRouter);
app.use('/users', usersRouter);
app.use('/monitoring', monitoringRouter);
app.use('/machines', machinesRouter);
app.use('/operator', operatorRouter);
app.use('/stats', statsRouter);
app.use('/tasks', tasksRouter)
//app.use('/notification', notificationRouter)

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
  res.render('error')
});
removeLoggedUsers()
sendEmails();
module.exports = {
  app: app,
  server: server,
};