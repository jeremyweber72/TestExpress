var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Organization = mongoose.model("Organization");


router.route("/")
    .get(function(request, response, next) {
        Organization.find(function(err, organizations) {
            if (err) {
                return next(err);
            }
            response.json(organizations);
        });
    });

module.exports = router;
