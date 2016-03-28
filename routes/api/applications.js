var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Application = mongoose.model("Application");


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
      var application = new Application(req.body);
      application.save(function (err, application) {
        if (err) {
          return next(err);
        }
      }).then(function (application) {
        res.json(application);
      });
    });





module.exports = router;
