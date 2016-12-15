var express = require('express');
var router = express.Router();
var subject_dal = require('../model/subject_dal');
var user_dal = require('../model/user_dal');

// View the subject for the given id
router.get('/', function(req, res){
    if(req.query.topic_id == null) {
        res.send('topic id is null');
    }
    else {
        subject_dal.getById(req.query.topic_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('subject/subjectViewByCDate', {'result': result, 'topic_id' : req.query.topic_id});
            }
        });
    }
});

router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    user_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('subject/subjectAdd', {'user': result, 'topic_id' : req.query.topic_id});
        }
    });


});


router.get('/insert', function(req, res){
    console.log(req.query);
    // simple validation
    if(req.query.subject_name == null) {
        res.send('a name for the subject must be provided.');
    }
    else if(req.query.subject_description == null) {
        res.send('A description for the subject must be provided');
    }
    else if(req.query.creator_id == null) {
        res.send('a user must be selected.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        subject_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/subject/?topic_id=' + req.query.topic_id);
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
