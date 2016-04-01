// Invoke 'strict' JavaScript mode
'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var db = require("../../../config/database");
var Application = db().model("Application");

//var Application = mongoose.model("Application");

module.exports = function(app) {
    router.route("/")
    .get(function(request, response, next) {
      Application.find(function(err, applications) {
        if (err) {
          return next(err);
        }

        response.json(applications);
      });
    })
    .post(function(req, res, next) {
      var user = new User(req.body);
        User.save(function (err, user) {
        if (err) {
          return next(err);
        }
      }).then(function (user) {
        res.json(user);
      });
    });

  app.use('/api/applications', router);
};


