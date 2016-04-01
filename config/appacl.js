/**
 * Created by jeremy on 3/31/2016.
 */
'use strict';

var acl = require('acl');
var mongoose = require('./database');

module.exports = function() {

    // var nacl = new acl(new acl.mongodbBackend(mongoose(),    "accesscontrol_"));
    // nacl.allow([
    //      {
    //          roles: 'admin',
    //          allows: [
    //              {resources: '/secret', permissions: 'create'},
    //              {resources: '/topsecret', permissions: '*'}
    //         ]
    //     }, {
    //         roles: 'user',
    //         allows: [
    //             {resources: '/secret', permissions: 'get'}
    //         ]
    //     }, {
    //         roles: 'guest',
    //         allows: []
    //     }
    // ]);
    //
    // return nacl;
    // //return 'bread: 2';
};
