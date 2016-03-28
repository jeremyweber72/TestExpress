var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var User = mongoose.model("User");


router.route("/")
    .get(function(request, response, next) {
        User.find(function(err, users) {
            if (err) {
                return next(err);
            }
            response.json(users);
        });
    });

module.exports = router;
