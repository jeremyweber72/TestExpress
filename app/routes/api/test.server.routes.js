'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var db = require("../../../config/database");
var Test = db().model("Test");
//var Test = mongoose.model("Test");

module.exports = function(app) {
    router.route("/")
        .get(function (request, response, next) {
            Test.find().populate("author").exec(function (err, tests) {
                if (err) {
                    return next(err);
                }
                response.json(tests);
            });
        });
    app.use('/api/tests', router);
    }

