const basic_config = require('../config_backend');
const utilFunc = require('../utils/utilFunc');
var express = require('express');
var router = express.Router();
const dbfunc = require("../utils/firebaseFunc/dbaccess/firebase");
const verifyFunc = require('../utils/verificationFunc/verification');
var jwt = require('jsonwebtoken');

// const sessionChecker = (req, res, next) => {
//     if (req.session.user && req.cookies.user_sid) {
//         res.redirect('/profile');
//     } else {
//         next();
//     }    
// };

const jwtVerification = function(req, res, next){
    if(!(req.cookies && req.cookies.token)){
        res.send({   //no token received
            result : 'error',
            message : 'No user signed in.'
        })
    }else{
        const token = req.cookies.token;
        
        jwt.verify(token, basic_config.session_secret_key, function(err, decodedToken){
            if(err){   //token received but is invalid
                res.clearCookie('token');
                res.send({
                    result : 'error',
                    message : 'Please Sign In to continue.'
                })
            }else{
                dbfunc.fetchUserProfile({email : decodedToken.email}, function(data){
                    if(data.result !== 'success'){
                        res.clearCookie('token');
                        res.send({ // credentials in token are invalid
                            result : 'error',
                            message : 'Please Sign In to continue.'
                        })
                    }else{ //good token
                        res.locals.userEmail = decodedToken.email;
                        res.locals.user = data;
                        next();
                    }
                    
                })
            }
        })
    }
}

router.get('/', function(req, res) {
    res.send('respond with a resource');
});

router.get('/test', (req, res) => {
    res.send({ key: 'Hello From addictd' });
});
  
router.get('/toppost', (req, res) => {
    // if(req.session.page_views){
    //     req.session.page_views++;
    //     res.send("You visited this page " + req.session.page_views + " times");
    //  } else {
    //     req.session.page_views = 1;
    //     res.send("Welcome to this page for the first time!");
    //  }
    dbfunc.fetchPosts(function(allPosts){
        res.send(allPosts);
    });
});
router.get('/authordetails/:id', (req, res) => {
    // const authorEmail = req.params.id.replace( /,/g ,".");
    // console.log('authemail: ',authorEmail);
    dbfunc.fetchAuthor( req.params.id , function(author){
        res.send(author);
    });
});
router.get('/currentuserdetails', jwtVerification, (req, res) => {
    res.send({
        result : 'success',
        content : res.locals.user.content
    })
});
router.get('/signoutuser', (req, res) => {
    res.clearCookie('token').send('Signed out successfully');
    // dbfunc.signOutUser(function(details){
    //     res.clearCookie('token').send(details);
    // });
});









router.post('/addpost', (req, res) => {
    var obj = req.body;
    obj['datetime'] = new Date().getTime();
    obj['id'] = obj['datetime'];
    dbfunc.saveNewPost(obj, function(data){
        res.send(data);
    })
});
router.post('/addcomment', jwtVerification, (req, res) => {
    var obj = req.body;
    obj.name = res.locals.user.content.dname;
    obj.avatar = 'https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_640.png';

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
            // if(data.result === 'success'){
            //     req.session.user = utilFunc.convertDotToComma(data.content.email);
            // }
            // console.log(data.token)
            res.cookie('token', data.token).send(data);
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
router.post('/createuserprofile', (req, res) => {
    var obj = req.body;
    dbfunc.createUserProfile(obj, function(data){
        res.send(data);
    })
    
});
router.post('/fetchprofiledata', (req, res) => {
    var obj = req.body;
    dbfunc.fetchUserProfile(obj, function(data){
        res.send(data);
    })
});
router.post('/updateuserprofiledata', jwtVerification, (req, res) => {
    var obj = req.body;
    obj.email = res.locals.userEmail;
    dbfunc.updateUserpProfileData(obj, function(data){
        res.send(data);
    })
});

module.exports = router;
