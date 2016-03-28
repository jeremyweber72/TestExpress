/**
 * Created by jweber on 3/11/2016.
 */
var mongoose = require('mongoose');

var ApplicationSchema = new mongoose.Schema({
    name: String,
    description: String,
    versions: [String],
    created: { type: Date, default: Date.now },
});

mongoose.model('Application', ApplicationSchema);