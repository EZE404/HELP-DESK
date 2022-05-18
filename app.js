var createError = require("http-errors");
var express = require("express");
var path = require("path");
//var cookieParser = require("cookie-parser");
var logger = require("morgan");
var favicon = require("serve-favicon");
var session = require('express-session');
const _ = require('lodash');

const db = require('./models/index');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
let myStore = new SequelizeStore({
	db: db.sequelize,
	modelKey: 'Sesion',
	tableName: 'session'
});



var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// settings
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
	_.forIn(req.body, function (value, key) {
		if (typeof req.body[key] == 'string') {
			req.body[key] = value.trim();
		}
	});
	return next();
});
//app.use(cookieParser());
app.use(session({ secret: 'ezequiel', store: myStore, resave: true, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, "public")));
app.locals.moment = require("moment");
app.use(favicon(path.join(__dirname, "public", "favicon_new.png")));

// routes
app.use("/", require("./routes/index"));
app.use('/login', require('./routes/routerLogin'));

// NUEVO FORMATO DE ADMIN, CLIENTE O EMPLEADO
app.use("/admin", require("./routes/routerAdmin"));
app.use("/cliente", require("./routes/routerCliente"));
app.use("/empleado", require("./routes/routerEmpleado"));

//app.use("/clientes", require("./routes/routerCliente"));
//app.use("/solicitudes", require("./routes/routerSolicitud"));
//app.use("/empleados", require("./routes/routerEmpleado"));
//app.use("/areas", require("./routes/routerArea"));
app.use("/validar", require('./routes/routerTestValidaciones')); //! SOLO PARA TESTEAR VALIDACIONES DE SEQUELIZE

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
