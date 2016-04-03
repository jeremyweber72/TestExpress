'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var morgan = require('morgan');
var methodOverride = require('method-override');
var mongoose = require("mongoose");
var moment = require('moment');

//passport
var LocalStrategy = require('passport-local').Strategy;
var crypto = require('crypto');
var bcrypt = require('bcryptjs');
var jwt = require('jwt-simple');
var session = require('express-session');
var passport = require('passport');
var jwtauth = require('./services/auth')

var flash    = require('connect-flash');
var configDB = require('./config/database.properties.js');

// DATABASE
//var dbURI = 'mongodb://localhost/TestExpress';
//mongoose.connect(dbURI);
mongoose.connect(configDB.url);


// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + configDB.url);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

require("./app/models/organization.server.model.js");
require("./app/models/user.server.model");
require("./app/models/application.server.model");
require("./app/models/role.server.model");
require("./app/models/test.server.model");

var routes = require('./app/routes/index');
var users = require('./app/routes/api/user.server.routes.js');
var applications = require('./app/routes/api/application.server.routes.js');
var roles = require('./app/routes/api/.js');
var organizations = require('./app/routes/api/organization.server.routes.js');
var authenticate = require('./app/routes/api/authenticate.server.routes');
var tests = require('./app/routes/api/test.server.routes.js');


moful
var app = express();
//var app = module.exports = express();
//var passport = passport();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('jwtTokenSecret', 'terces');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(passport.initialise());

// required for passport
require('./config/passport')(passport); // pass passport for configuration


//app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api/users', users );
app.use('/api/applications', applications);
app.use('/api/roles', roles);
app.use('/api/organizations', organizations);
app.use('/api/authenticate', authenticate);

app.use('/api/tests', tests);
// app.use(function(req, res, next) {
//
//   // check header or url parameters or post parameters for token
//   var token = req.body.token || req.query.token || req.headers['x-access-token'];
//
//   // decode token
//   if (token) {
//
//     // verifies secret and checks exp
//     jwt.verify(token, app.get('jwtTokenSecret'), function(err, decoded) {
//       if (err) {
//         return res.json({ success: false, message: 'Failed to authenticate token.' });
//       } else {
//         // if everything is good, save to request for use in other routes
//         req.decoded = decoded;
//         next();
//       }
//     });
//
//   }
//   else {
//
//     return err;
//       // if there is no token
//       // return an error
//       return res.status(403).send({
//         success: false,
//         message: 'No token provided.'
//       });
//
//   }
// });

// app.use(function ensureAuthenticated(req, res, next) {
//   if (req.headers.authorization) {
//     var token = req.headers.authorization.split(' ')[1];
//     try {
//       var decoded = jwt.decode(token, tokenSecret);
//       if (decoded.exp <= Date.now()) {
//         res.send(400, 'Access token has expired');
//       } else {
//         req.user = decoded.user;
//         return next();
//       }
//     } catch (err) {
//       return res.send(500, 'Error parsing token');
//     }
//   } else {
//     return res.send(401);
//   }
// });

// function createJwtToken(user) {
//   var payload = {
//     user: user,
//     iat: new Date().getTime(),
//     exp: moment().add('days', 7).valueOf()
//   };
//   return jwt.encode(payload, tokenSecret);
// }

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
