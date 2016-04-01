//todo: needs to be secured to just sysadmins
'use strict';
var mongoose = require("mongoose");

//var crypto = require("crypto");
//var jwt = require("jsonwebtoken");

/*
 {
 "_id": ObjectId("56f7f022a0cf35544af7cf06"),
 "company": "Sample Org",
 "name": "Sample Org",
 "type": "user",
 "enabled": true,
 "expiration": "some date"
 }

 */

  var OrganizationSchema = new mongoose.Schema({
    company: String,
    name: String,
    type: String,
    enabled: Boolean,
    expration: Date
  });

  //module.exports = mongoose.model('Organization', OrganizationSchema);

mongoose.model('Organization', OrganizationSchema);
