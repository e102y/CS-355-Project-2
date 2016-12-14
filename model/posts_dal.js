var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);



exports.getById = function(post_date, callback) {
    var query = 'SELECT * FROM PostsinaSubject WHERE post_date = ?';
    var queryData = [post_date];

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
    var query = 'CALL NewPost(\'?\', \'?\', ?, \'?\');';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.post_description, post_title, params.creator_id, subject_title];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.delete = function(post_date_of_creation, callback) {
    var query = 'DELETE FROM post WHERE date_of_creation = ?';
    var queryData = [post_date_of_creation];

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

exports.getAll = function(callback) {
    var query = 'SELECT * FROM post;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};