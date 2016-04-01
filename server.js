// Invoke 'strict' JavaScript mode
'use strict';

// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load the module dependencies
var mongoose = require('./config/database'),
    express = require('./config/express'),
    passport = require('./config/passport'),
    acl = require('./config/appacl')


// Create a new Mongoose connection instance
var db = mongoose();

var acl = acl();

// Create a new Express application instance
var app = express();



// Configure the Passport middleware
var passport = passport();

// Use the Express application instance to listen to the '3000' port
app.listen(3001);

// Log the server status to the console
console.log('Server running at http://localhost:3001/');

// Use the module.exports property to expose our Express application instance for external usage
module.exports = app;