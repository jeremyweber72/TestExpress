var mongoose = require("mongoose");
//var crypto = require("crypto");
//var jwt = require("jsonwebtoken");

var UserSchema = new mongoose.Schema({
  //ID: mongoose.Schema.Types.ObjectId,
  firstName: String,
  lastName: String,
  userName: String,
  email: String,

  username: {
    type: String,
    lowercase: true,
    unique: true
  },
  password: String,
  enabled: Boolean,
  roles: [{type: mongoose.Schema.Types.ObjectId, ref: 'Role'}]

});

module.exports = mongoose.model('User', UserSchema);
//mongoose.model("User", UserSchema);
