// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var config = require('./config'),
	express = require('express'),
	router = require('express').Router,
	consign = require('consign'),
	morgan = require('morgan'),
	compress = require('compression'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	session = require('express-session'),
	flash = require('connect-flash'),
	passport = require('passport')
	//nacl = require('./bread');



// Define the Express configuration method
module.exports = function() {
	// Create a new Express application instance
	var app = express();

	//var nacl = require('./bread')(app);
	//var bread = require('./bread');
	// var acl = nacl();
	// console.log(acl);


	// Use the 'NDOE_ENV' variable to activate the 'morgan' logger or 'compress' middleware
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	} else if (process.env.NODE_ENV === 'production') {
		app.use(compress());
	}

	// Use the 'body-parser' and 'method-override' middleware functions
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());



	// Configure the 'session' middleware
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
	}));


	// Set the application view engine and 'views' folder
	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	// Configure the flash messages middleware
	app.use(flash());
//	app.use(acl.initialize());

	// Configure the Passport middleware
	app.use(passport.initialize());
	app.use(passport.session());

	app.set('superSecret', 'terces');

	// Load the routing files
	require('../app/routes/api/authenticate.server.routes.js')(app);


	require('../app/routes/api/api.server.routes.js')(app);
	require('../app/routes/api/application.server.routes.js')(app);
	//require('../app/routes/api/index.server.routes.js')(app);
	require('../app/routes/api/organization.server.routes.js')(app);
	require('../app/routes/api/role.server.routes.js')(app);
	require('../app/routes/api/test.server.routes.js')(app);
	require('../app/routes/api/user.server.routes.js')(app);


	// Configure static file serving
	app.use(express.static('./public'));


	// Return the Express application instance
	return app;

};
