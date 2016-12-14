var express = require('express');
var router = express.Router();
var subject_dal = require('../model/subject_dal');


// View the subject for the given id
router.get('/', function(req, res){
    if(req.query.topic_date == null) {
        res.send('topic date is null');
    }
    else {
        subject_dal.getById(req.query.topic_date, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('subject/subjectViewByCDate', {'result': result});
            }
        });
    }
});

router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually

    res.render('subject/subjectAdd');

});


router.get('/insert', function(req, res){
    console.log(req.query);
    // simple validation
    if(req.query.subject_fname == null) {
        res.send('a first name must be provided.');
    }
    else if(req.query.subject_lname == null) {
        res.send('A last name must be provided');
    }
    if(req.query.subject_email == null) {
        res.send('an e-mail must be provided.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        subject_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/topic/all');
            }
        });
    }
});


// Delete a subject for the given creation date
router.get('/delete', function(req, res){
    if(req.query.date_of_creation == null) {
        res.send('creation date is null');
    }
    else {
        subject_dal.delete(
            req.query.date_of_creation,
            function(err, result){
                if(err) {
                    res.send(err);
                }
                else {
                    //poor practice, but we will handle it differently once we start using Ajax
                    res.redirect(302, '/subject/all');
                }
            }
        );
    }
});

router.get('/edit', function(req, res){
    if(req.query.date_of_creation == null) {
        res.send('the subject\'s date of creation  is required');
    }
    else {
        subject_dal.edit(req.query.subject_id, function(err, result){
            res.render('subject/subjectUpdate', {subject: result[0][0], address: result[1]});
        });
    }

});

router.get('/update', function(req, res){
    subject_dal.update(req.query, function(err, result){
        res.redirect(302, '/subject/all');
    });
});

module.exports = router;
