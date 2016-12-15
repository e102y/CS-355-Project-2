var express = require('express');
var router = express.Router();
var user_dal = require('../model/user_dal');


// View All users
router.get('/all', function(req, res) {
    user_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('user/userViewAll', { 'result':result });
        }
    });

});

// View the user for the given id
router.get('/', function(req, res){
    if(req.query.user_id == null) {
        res.send('The user id entered is null');
    }
    else {
        user_dal.getById(req.query.user_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('user/userViewById', {'result': result});
            }
        });
    }
});

router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually

    res.render('user/userAdd');

});


router.get('/insert', function(req, res){
    console.log(req.query);
    // simple validation
    if(req.query.user_fname == null) {
        res.send('a first name must be provided.');
    }
    else if(req.query.user_lname == null) {
        res.send('A last name must be provided');
    }
    else if(req.query.user_username == null) {
        res.send('A username must be provided.');
    }
    else if(req.query.user_bio == null) {
        req.query.user_bio = '';
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        user_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/user/all');
            }
        });
    }
});


// Delete a user for the given creation date
router.get('/delete', function(req, res){
    if(req.query.date_of_creation == null) {
        res.send('creation date is null');
    }
    else {
        user_dal.delete(
            req.query.date_of_creation,
            function(err, result){
                if(err) {
                    res.send(err);
                }
                else {
                    //poor practice, but we will handle it differently once we start using Ajax
                    res.redirect(302, '/user/all');
                }
            }
        );
    }
});

router.get('/edit', function(req, res){
    if(req.query.user_id == null) {
        res.send('A user id is required');
    }
    else {
        user_dal.edit(req.query.user_id, function(err, result){
            res.render('user/userUpdate', {user: result});
        });
    }

});

router.get('/update', function(req, res){
    if(req.query.user_bio == null) {
        req.query.user_bio = '';
    }
    user_dal.update(req.query, function(err, result){
        res.redirect(302, '/user/all');
    });
});

module.exports = router;
