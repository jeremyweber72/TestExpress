var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
//var mongoose = require("mongoose");
var db = require("../../../config/database");
var User = db().model("User");
var jwt = require('jsonwebtoken');
var moment = require('moment');

module.exports = function(app) {
    router.post('/', function (req, res) {

        // find the user
        User.findOne({ username: req.body.username}, function (err, user) {
            if (err)  throw err;

            if (!user) {
                res.json({success: false, message: 'Authentication failed. User not found.'});
            } else if (user) {

                // check if password matches
                if (user.password != req.body.password) {
                    res.json({success: false, message: 'Authentication failed. Wrong password.'});
                } else {


                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign(user.id, app.get('superSecret'), {
                        expiresIn: 1440 // expires in 24 hours
                    });
                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }

            }

        });
    });
    app.use('/api/authenticate', router);
}

