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

router.post('/addpost', (req, res) => {
    var obj = req.body;
    obj['datetime'] = new Date().getTime();
    obj['id'] = obj['datetime'];
    dbfunc.saveNewPost(obj, function(data){
        res.send(data);
    })
});

module.exports = router;
