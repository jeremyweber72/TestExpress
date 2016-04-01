'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var db = require("../../../config/database");
var User = db().model("User");
//var User = mongoose.model("User");
//var auth = require("../../services/auth");

var users = require('../../../app/controllers/users.server.controller'),
    passport = require('passport');

module.exports = function (app) {
    router.route("/")
        .get(
            function (request, response, next) {

                console.log("test");

                //console.log(auth(request);
                User.find(function (err, users) {
                    if (err) {
                        return next(err);
                    }
                    response.json(users);
                });

            });


    app.use('/api/users', router);
}


