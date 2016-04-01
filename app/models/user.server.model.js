var mongoose = require("mongoose");
var cyrpto   = require('crypto');

var UserSchema = new mongoose.Schema({
  //ID: mongoose.Schema.Types.ObjectId,
  firstName: String,
  lastName: String,
  userName: String,
  email: {
    type: String,
    match: [/.+\@.+\..+/, "Please use a valid email address"]
  },
  username: {
    type: String,
    unique: true,
    required: 'Username is required',
    trim: true
  },
  password: {
    type: String,
    validate: [
      function (passwprd) {
        return password && password.length > 2;
      }, 'Password needs to be longer'
    ]
  },
  salt: {
    type :String
  },
  provider: {
    type: String,
    required: "Provider is required"
  },
  providerId: String,
  providerDate: {},
  created: {
    type: Date,
    default: Date.now
  },
  enabled: Boolean,
  roles: [{type: mongoose.Schema.Types.ObjectId, ref: 'Role'}]

});

// Set the 'fullname' virtual property
UserSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
  var splitName = fullName.split(' ');
  this.firstName = splitName[0] || '';
  this.lastName = splitName[1] || '';
});

// Use a pre-save middleware to hash the password
UserSchema.pre('save', function(next) {
  if (this.password) {
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
    this.password = this.hashPassword(this.password);
  }

  next();
});

// Create an instance method for hashing a password
UserSchema.methods.hashPassword = function(password) {
  return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

// Create an instance method for authenticating user
UserSchema.methods.authenticate = function(password) {
  return this.password === this.hashPassword(password);
};

// Find possible not used username
UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
  var _this = this;

  // Add a 'username' suffix
  var possibleUsername = username + (suffix || '');

  // Use the 'User' model 'findOne' method to find an available unique username
  _this.findOne({
    username: possibleUsername
  }, function(err, user) {
    // If an error occurs call the callback with a null value, otherwise find find an available unique username
    if (!err) {
      // If an available unique username was found call the callback method, otherwise call the 'findUniqueUsername' method again with a new suffix
      if (!user) {
        callback(possibleUsername);
      } else {
        return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
      }
    } else {
      callback(null);
    }
  });
};

// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
UserSchema.set('toJSON', {
  getters: true,
  virtuals: true
});


module.exports = mongoose.model('User', UserSchema);
//mongoose.model("User", UserSchema);
