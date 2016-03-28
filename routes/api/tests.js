var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Test = mongoose.model("Test");


router.route("/")
    .get(function(request, response, next) {
        Test.find().populate("author").exec(function(err, tests) {
            if (err) {
                return next(err);
            }
            response.json(tests);
        });
    });

module.exports = router;
