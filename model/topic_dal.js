var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);



exports.getAll = function(callback) {
    var query = 'SELECT * FROM ShowTopics;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(creator_id, callback) {
    var query = 'SELECT * FROM ShowTopics WHERE creator_id = ?';
    var queryData = [creator_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'CALL NewTopic(?, ?, ?, ?);';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.topic_description, params.topic_name, params.creator_id, params.moderator_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.delete = function(topic_id, callback) {
    var query = 'DELETE FROM topic WHERE topic_id = ?';
    var queryData = [topic_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.update = function(params, callback) {
    var query = 'UPDATE topic SET title = ?, description = ?, moderator_id = ? WHERE topic_id = ?';
    var queryData = [params.topic_title, params.topic_description, params.moderator_id, params.topic_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};



exports.edit = function(topic_id, callback) {
    var query = 'Select * FROM ShowTopics where topic_id = topic_id';
    var queryData = [topic_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.obligatoryAggregate = function(callback) {
    var query = 'Select count(posts) as subjects FROM subjectCount;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};