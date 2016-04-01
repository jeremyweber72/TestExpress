'use strict';
var express = require('express');
var router = express.Router();
//var mongoose = require("mongoose");
var db = require("../../../config/database");
var Role = db().model("Role");
//var Role = mongoose.model("Role");

module.exports = function(app) {

    router.route("/")
        .get(function (request, response, next) {
            Role.find(function (err, roles) {
                if (err) {
                    return next(err);
                }

                response.json(roles);
            });
        })

        .post(function (req, res, next) {
            var role = new Role(req.body);
            role.save(function (err, role) {
                if (err) {
                    return next(err);
                }
            }).then(function (role) {
                res.json(role);
            });
        });

    router.route('/:role_id')
        .get(function (req, res) {
            Role.findById(req.params.role_id, function (err, role) {
                if (err)
                    res.send(err);
                res.json(role);
            });
        })

        .delete(function (req, res) {
            Role.remove({
                _id: req.params.role_id
            }, function (err, role) {
                if (err)
                    res.send(err);

                res.json({message: 'Successfully deleted'});
            });
        });

    app.use('/api/roles', router);
}




