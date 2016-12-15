var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM user;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};



exports.getById = function(user_id, callback) {
    var query = 'SELECT * FROM user WHERE user_id = ?';
    var queryData = [user_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'CALL NewUser(?, ?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.user_Byear + '-'+params.user_Bday + '-' +params.user_Bmonth, params.user_fname, params.user_lname, params.user_username];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });

};


exports.delete = function(user_id, callback) {
    var query = 'DELETE FROM user WHERE user_id = ?';
    var queryData = [user_id];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });

};

exports.update = function(params, callback) {
    var query = 'UPDATE user SET first_name = ?, last_name = ?, email = ? WHERE user_id = ?';
    var queryData = [params.user_first, params.user_last, params.user_email, params.user_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};



exports.edit = function(user_id, callback) {
    var query = 'CALL user_getinfo(?)';
    var queryData = [user_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};