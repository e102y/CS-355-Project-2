var express = require('express');
var router = express.Router();
var post_dal = require('../model/posts_dal');
var user_dal = require('../model/user_dal');

// View the post for the given id
router.get('/', function(req, res){
    if(req.query.subject_id == null) {
        res.send('subject id is null');
    }
    if(req.query.topic_id == null) {
        res.send('topic id is null');
    }
    else {
        user_dal.getAll(function(err,result1) {
            if (err) {
                res.send(err);
            }
            else {
        post_dal.getById(req.query.subject_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('Posts/postsView', {'user': result1,'result': result, 'subject_id' : req.query.subject_id,'topic_id' : req.query.topic_id });
            }

        });
            }
        });
    }
});

router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    user_dal.getAll(function(err,result1) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('Posts/postAdd', {'user': result, 'subject_id' : req.query.subject_id,'topic_id' : req.query.topic_id });
        }
    });


});


router.get('/insert', function(req, res){
    console.log(req.query);
    // simple validation
    if(req.query.post_Subject == null) {
        res.send('a Subject for the post must be provided.');
    }
    else if(req.query.post_Body == null) {
        res.send('A Body of Text for the post must be provided');
    }
    else if(req.query.creator_id == null) {
        res.send('a user must be selected.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        post_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/posts/?subject_id=' + req.query.subject_id + '&topic_id=' + req.query.topic_id);
            }
        });
    }
});

// Delete a post for the given creation date
router.get('/delete', function(req, res){
    if(req.query.post_id == null) {
        res.send('post id is null');
    }
    else {
        post_dal.delete(
            req.query.post_id,
            function(err, result){
                if(err) {
                    res.send(err);
                }
                else {
                    //poor practice, but we will handle it differently once we start using Ajax
                    res.redirect(302, '/posts/?subject_id=' + req.query.subject_id + '&topic_id=' + req.query.topic_id);
                }
            }
        );
    }
});

router.get('/edit', function(req, res){
    if(req.query.post_id == null) {
        res.send('the post\'s id  is required');
    }
    else {
        post_dal.edit(req.query.post_id, function(err, result){
            res.render('Posts/postUpdate', {'post': result, 'subject_id' : req.query.subject_id,'topic_id' : req.query.topic_id});
        });
    }

});

router.get('/update', function(req, res){
    post_dal.update(req.query, function(err, result){
        res.redirect(302, '/posts/?subject_id=' + req.query.subject_id + '&topic_id=' + req.query.topic_id);
    });
});

module.exports = router;
