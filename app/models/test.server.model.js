/**
 * Created by jweber on 3/11/2016.
 * {
    "_id": ObjectId("56f7ee6aa0cf35544af7cf05"),
    "name": "Google search contains bada bing",
    "description": "Some description",
    "status": "draft",
    "executionType": "manual",
    "expectedExectionTime": "1",
    "preconditions": "Open browser to google.com",
    "steps": [
        {
            "stepName": "enter bada bing in search field",
            "expectedResult": "page contains bada bing search results"
        }
    ],
    "testType": "functional",
    "tags": [
        {
            "tag": "google"
        },
        {
            "tag": "searchResults"
        }
    ],
    "created": "some date",
    "author": "56f7f190a0cf35544af7cf0d",
    "organization": "56f7f022a0cf35544af7cf06"
}
 */
'use strict';
var mongoose = require('mongoose');

var TestSchema = new mongoose.Schema({
    name: String,
    description: String,
    created: Date,
    status: String,
    executionType: String,
    expectedExecutionTime: Number,
    preconditions: String,
    steps: {
        step: String,
        expectedStepResult: String
    },
    tags: {
        tag: String,
    },
    testType: String,
    lastModified: Date,
    lastModifiedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    organization: [{type: mongoose.Schema.Types.ObjectId, ref: 'Organization'}]

});

mongoose.model('Test', TestSchema);