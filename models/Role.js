/**
 * Created by jweber on 3/11/2016.
 */
var mongoose = require('mongoose');

var RoleSchema = new mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Role', RoleSchema);