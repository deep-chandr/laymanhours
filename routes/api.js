var express = require('express');
var router = express.Router();
const dbfunc = require("./dbaccess/firebase");


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

module.exports = router;
