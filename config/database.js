// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var	config = require('./config'),
    mongoose = require('mongoose');

// Define the Mongoose configuration method

module.exports = function() {
    // Use Mongoose to connect to MongoDB

    var db = mongoose.createConnection(config.db);

    mongoose.connection.on('connected', function () {
        console.log('Mongoose default connection open to ' + config.db);
    });

// If the connection throws an error
    mongoose.connection.on('error',function (err) {
        console.log('Mongoose default connection error: ' + err);
    });

// When the connection is disconnected
    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose default connection disconnected');
    });

    // Load the 'User' model
    //todo do these need to be here?
    require('../app/models/application.server.model');
    require('../app/models/organization.server.model');
    require('../app/models/role.server.model');
    require('../app/models/test.server.model');
    require('../app/models/user.server.model');

    // Return the Mongoose connection instance
    return db;
};