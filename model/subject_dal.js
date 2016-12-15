var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);



exports.getById = function(topic_id, callback) {
    var query = 'SELECT * FROM SubjectsinaTopic WHERE topic_id = ?;';
    var queryData = [topic_id];

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
    var query = 'CALL NewSubject(?, ?, ?, ?);';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.subject_description, params.subject_name, params.creator_id, params.topic_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.delete = function(subject_id, callback) {
    var query = 'DELETE FROM subject WHERE subject_id = ?';
    var queryData = [subject_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.update = function(params, callback) {
    var query = 'UPDATE subject SET title = ?, description = ? WHERE subject_id = ?';
    var queryData = [params.subject_title, params.subject_description, params.subject_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};



exports.edit = function(subject_id, callback) {
    var query = 'SELECT * FROM SubjectsinaTopic WHERE subject_id = ?;';
    var queryData = [subject_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};