var express = require('express');
var router = express.Router();
var topic_dal = require('../model/topic_dal');


// View All topics
router.get('/all', function(req, res) {
    topic_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('topic/topicViewAll', { 'result':result });
        }
    });

});

// View the topic for the given id
router.get('/', function(req, res){
    if(req.query.topic_id == null) {
        res.send('creator_id is null');
    }
    else {
        topic_dal.getById(req.query.topic_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('topic/topicViewByCID', {'result': result});
            }
        });
    }
});

router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually

    res.render('topic/topicAdd');

});


router.get('/insert', function(req, res){
    console.log(req.query);
    // simple validation
    if(req.query.topic_fname == null) {
        res.send('a first name must be provided.');
    }
    else if(req.query.topic_lname == null) {
        res.send('A last name must be provided');
    }
    if(req.query.topic_email == null) {
        res.send('an e-mail must be provided.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        topic_dal.insert(req.query, function(err,result) {
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


// Delete a topic for the given creation date
router.get('/delete', function(req, res){
    if(req.query.date_of_creation == null) {
        res.send('creation date is null');
    }
    else {
        topic_dal.delete(
            req.query.date_of_creation,
            function(err, result){
                if(err) {
                    res.send(err);
                }
                else {
                    //poor practice, but we will handle it differently once we start using Ajax
                    res.redirect(302, '/topic/all');
                }
            }
        );
    }
});

router.get('/edit', function(req, res){
    if(req.query.topic_id == null) {
        res.send('An topic id is required');
    }
    else {
        topic_dal.edit(req.query.topic_id, function(err, result){
            res.render('topic/topicUpdate', {topic: result[0][0], address: result[1]});
        });
    }

});

router.get('/update', function(req, res){
    topic_dal.update(req.query, function(err, result){
        res.redirect(302, '/topic/all');
    });
});

module.exports = router;
