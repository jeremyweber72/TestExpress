'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var db = require("../../../config/database");
var bread = require("../../../config/appacl");
var Organization = db().model("Organization");


module.exports = function(app) {
    router.route("/")
        .get(
            //bread().middleware( 1, get_user_id ),
            function (request, response, next) {
            Organization.find(function (err, organizations) {
                if (err) {
                    return next(err);
                }
                response.json(organizations);
            });
        });
    app.use('/api/organizations', router);
}

// Provide logic for getting the logged-in user
//  This is a job for your authentication layer
function get_user_id( request, response ) {
    return 'jw@gmail.com';
}

