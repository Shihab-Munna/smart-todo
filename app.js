const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
//const SessionStore = require('express-session-sequelize')(expressSession.Store);
const PORT = 5000;
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const noteRouter = require('./routes/note');
const taskRouter = require('./routes/task');
const { errorHandler }= require('./util/errorhandle');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.json')[env];
const db = require('./models');
const {
  sequelize,
  Sequelize
} = require('./models');

const database = new Sequelize(config);


// const sequelizeSessionStore = new SessionStore({
//   db: database,
//   expiration: 6000,
// });
const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// app.use(expressSession({
//   secret: 'forMunnaKeepItSecret',
//   store: sequelizeSessionStore,
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     maxAge: 60000
//   }
// }));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/note', noteRouter);
app.use('/task', taskRouter);

// app.get("/my-endpoint", function (req, res) {
//   res.json({
//     message: "hello world"
//   });
// });

//catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

//error handler

app.use(function (err, req, res, next) {
  errorHandler(err, res);
});

sequelize
  .authenticate()
  .then(function (err) {
    console.log('Connection has been established successfully.');
  }, function (err) {
    console.log('Unable to connect to the database:', err);
  });

app.listen(PORT, () => {
  console.log(`Server started on : http://localhost/${PORT}`);
})
module.exports = app;
