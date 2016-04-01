/**
 * Created by jeremy on 3/29/2016.
 * auth
 *
 *  A simple middleware for parsing a JWt token attached to the request. If the token is valid, the corresponding user
 *  will be attached to the request.
 */

var url = require('url')
var UserModel = require('./user.server.model')
var jwt = require('jwt-simple');


module.exports = function(req, res, next){

    console.log("here");
    // Parse the URL, we might need this
    var parsed_url = url.parse(req.url, true)

    /**
     * Take the token from:
     *
     *  - the POST value access_token
     *  - the GET parameter access_token
     *  - the x-access-token header
     *    ...in that order.
     */
    var token = (req.body && req.body.access_token) || parsed_url.query.access_token || req.headers["x-access-token"];
    var app = require("../server");
    if (token) {
        console.log(token);
        try {
            var decoded = jwt.decode(token, app.get('jwtTokenSecret'))

            if (decoded.exp <= Date.now()) {
                //res.end('Access token has expired', 400)
            }

            UserModel.findOne({ '_id': decoded.iss }, function(err, user){

                if (!err) {
                    req.user = user
                    return next()
                }
            })

        } catch (err) {
            return next()
        }

    } else {
        console.log("here2");
         return next();
    }
}