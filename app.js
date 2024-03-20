var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// cookies, sessions
const session = require('express-session');
const MongoStore = require('connect-mongo');

// var indexRouter = require('./routes/index');
const blogRouter = require('./routes/blog');

var app = express();

// database connection

require('dotenv').config();
const mongoose = require('mongoose');
const dbCredentials = process.env.MONGO_DB;

connect();

async function connect() {
	try {
		await mongoose.connect(dbCredentials);
		console.log('Connected to DB!');
	} catch (error) {
		console.error(error);
	}
}

// views and uses

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session connection
// call BEFORE routes

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		store: MongoStore.create({
			mongoUrl: process.env.MONGO_DB,
		}),
		cookie: {
			maxAge: 10000,
		},
	})
);

// ROUTES

app.use('/', blogRouter);

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
