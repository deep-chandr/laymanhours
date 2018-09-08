var express = require('express');
var router = express.Router();
const dbfunc = require("../utils/firebaseFunc/dbaccess/firebase");
const verifyFunc = require('../utils/verificationFunc/verification');

router.get('/', function(req, res) {
    res.send('respond with a resource');
});

router.get('/test', (req, res) => {
    res.send({ key: 'Hello From addictd' });
});
  
router.get('/toppost', (req, res) => {
    dbfunc.fetchPosts(function(allPosts){
        res.send(allPosts);
    });
});
router.get('/authordetails/:id', (req, res) => {
    dbfunc.fetchAuthor(req.params.id, function(author){
        res.send(author);
    });
});
router.get('/currentuserdetails', (req, res) => {
    dbfunc.currentUserDetails(function(details){
        res.send(details);
    });
});
router.get('/signoutuser', (req, res) => {
    dbfunc.signOutUser(function(details){
        res.send(details);
    });
});









router.post('/addpost', (req, res) => {
    var obj = req.body;
    obj['datetime'] = new Date().getTime();
    obj['id'] = obj['datetime'];
    dbfunc.saveNewPost(obj, function(data){
        res.send(data);
    })
});

router.post('/addauthor', (req, res) => {
    var obj = req.body;
    // obj['datetime'] = new Date().getTime();
    // obj['id'] = obj['datetime'];
    dbfunc.saveNewAuthor(obj, function(data){
        res.send(data);
    })
});
router.post('/addcomment', (req, res) => {
    var obj = req.body;
    var postid = obj['postid'];
    delete obj['postid'];

    obj['datetime'] = new Date().getTime();
    obj['id'] = obj['datetime'];
    dbfunc.saveComment(postid, obj, function(data){
        res.send(data);
    })
});
router.post('/authenticateuser', (req, res) => {
    var obj = req.body;
    if(!verifyFunc.isEmailTrue(obj.email)){
        res.send('Please enter a valid email.')
    }else{
        dbfunc.authenticateUser(obj, function(data){
            res.send(data);
        })
    }
});

router.post('/newauthenticateuser', (req, res) => {
    var obj = req.body;
    if(!verifyFunc.isEmailTrue(obj.email)){
        res.send('Please enter a valid email.')
    }else{
        dbfunc.newAuthenticateUser(obj, function(data){
            res.send(data);
        })
    }
    
});


module.exports = router;
