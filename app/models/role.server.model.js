/**
 * Created by jweber on 3/11/2016.
 */
'use strict';
var mongoose = require('mongoose');

var RoleSchema = new mongoose.Schema({
    name: String
});

mongoose.model('Role', RoleSchema);