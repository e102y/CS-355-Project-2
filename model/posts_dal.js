var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);



exports.getById = function(subject_id, callback) {
    var query = 'SELECT * FROM PostsinaSubject WHERE subject_id = ?';
    var queryData = [subject_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
/*
 SSelect s.poster_name,s.poster_ID, p.subject, p.text, p.date_of_creation, p.subject_date, s.title AS subjectTitle
 From post p
 join poster s ON s.post_date = p.date_of_creation
 join subject u ON u.date_of_creation = p.subject_date
 Group By p.date_of_creation;
 */
exports.insert = function(params, callback) {
    var query = 'CALL NewPost(?, ?, ?, ?);';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.post_Body, params.post_Subject, params.creator_id, params.subject_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.delete = function(post_id, callback) {
    var query = 'DELETE FROM post WHERE post_id = ?';
    var queryData = [post_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.update = function(params, callback) {
    var query = 'UPDATE post SET subject = ?, text = ?, modification_date = NOW() WHERE post_id = ?';
    var queryData = [params.post_Subject, params.post_Body, params.post_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};



exports.edit = function(post_id, callback) {
    var query = 'SELECT * FROM PostsinaSubject WHERE post_id = ?';
    var queryData = [post_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.getAll = function(callback) {
    var query = 'SELECT * FROM post;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};