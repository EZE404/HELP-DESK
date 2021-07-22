var createError = require("http-errors");
var express = require("express");
var path = require("path");
//var cookieParser = require("cookie-parser");
var logger = require("morgan");
var favicon = require("serve-favicon");
var session = require('express-session');

var indexRouter = require("./routes/index");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// settings
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(session({secret:'ezequiel', resave: false, saveUninitialized: false}));
app.use(express.static(path.join(__dirname, "public")));
app.locals.moment = require("moment");
app.use(favicon(path.join(__dirname, "public", "favicon.png")));

// routes
app.use("/", indexRouter);
app.use('/login', require('./routes/routerLogin'));
app.use("/clientes", require("./routes/routerCliente"));
app.use("/solicitudes", require("./routes/routerSolicitud"));
app.use("/empleados", require("./routes/routerEmpleado"));
app.use("/areas", require("./routes/routerArea"));

// CERRAR SESIÓN
app.get('/close', async (req, res) => {
    await req.session.destroy();
    res.redirect('/');
})

// 404
app.get("*", function (req, res) {
	res.status(404);
	res.render("404");
	//res.sendFile(path.join(__dirname + '/public/img/a23.jpg'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
