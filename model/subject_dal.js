var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);



exports.getById = function(topic_date, callback) {
    var query = 'SELECT * FROM SubjectsinaTopic WHERE topic_date = ?';
    var queryData = [topic_date];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
/*
 create or replace view  SubjectsinaTopic as
 Select c.creator_name,u.creator_ID, u.title, u.description, u.date_of_creation, u.topic_date, t.title AS topicTitle
 From topic t
 join subject u ON t.date_of_creation = u.topic_date
 LEFT JOIN subject_creator c ON c.creator_id = u.creator_ID
 Group By u.date_of_creation;
 */
exports.insert = function(params, callback) {
    var query = 'CALL NewSubject(\'?\', \'?\', ?, \'?\');';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.subject_description, subject_title, params.creator_id, topic_title];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.delete = function(subject_date_of_creation, callback) {
    var query = 'DELETE FROM subject WHERE date_of_creation = ?';
    var queryData = [subject_date_of_creation];

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