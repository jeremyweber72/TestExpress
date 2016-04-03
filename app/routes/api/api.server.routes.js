'use strict';
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var db = require("../../../config/database");
var User = db().model("User");

module.exports = function(app) {

    router.use(function(req, res, next) {

        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, app.get('superSecret'), function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });

        } else {

            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }
    });

    router.use(function(req, res, next) {
        console.log("next use");
        //console.log(get_user_id());
        isValid(req,res,next);

        
        return res.json({ success: true, message: req.decoded });
    });

    app.use('/api', router);
}

// Provide logic for getting the logged-in user
//  This is a job for your authentication layer
function get_user_id( ) {
    return 'jw@gmail.com';
}

function isValid( req, res, next) {

    User.findById(req.decoded, function (err, users) {

        if( users.enabled ) {
            console.log(users.enabled)

            return err;
        }





        if ( users.length == 0){
            throw new err;
        }

        var _user = users[0];
        console.log(users);





        //console.log(users);


        //response.json(users);
    });


    //return users;
}




