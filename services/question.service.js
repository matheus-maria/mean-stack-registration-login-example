var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('questions');

var service = {};

service.GetAll = GetAll;
service.Create = Create;

module.exports = service;

function GetAll() {
    var deferred = Q.defer();
    
    var questions = db.questions.find({})

    if (questions) {   
        deferred.resolve(questions);
    } else {            
        deferred.resolve();
    }

    return deferred.promise;
}

function Create(question) {
    var deferred = Q.defer();

    db.questions.insert(
        question,
        function (err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });
    

    return deferred.promise;
}