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
    var query = 'CALL NewTopic(\'?\', \'?\', ?, ?);';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.topic_description, topic_title, params.creator_id, params.moderator_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.delete = function(topic_date_of_creation, callback) {
    var query = 'DELETE FROM topic WHERE date_of_creation = ?';
    var queryData = [topic_date_of_creation];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.update = function(params, callback) {
    var query = 'UPDATE school SET school_name = ?, address_id = ? WHERE school_id = ?';
    var queryData = [params.school_name, params.address_id, params.school_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};



exports.edit = function(school_id, callback) {
    var query = 'CALL school_getinfo(?)';
    var queryData = [school_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};