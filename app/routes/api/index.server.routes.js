// Invoke 'strict' JavaScript mode
'use strict';
var express = require('express');
var router = express.Router();

// Define the routes module' method
module.exports = function(app) {
	// Load the 'index' controller
	var index = require('../controllers/index.server.controller');

	// Mount the 'index' controller's 'render' method
	route.get('/', index.render);
	app.use('/', router);
};
