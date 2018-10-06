var firebase = require("firebase");
var jwt = require('jsonwebtoken');
var basic_config = require('../../../config_backend');
const bcrypt = require('bcrypt');
var config = basic_config.firebase_auth;
const utilFunc = require('../../utilFunc');

firebase.initializeApp(config);
const database = firebase.database();


const getSecretJWTToken = function(obj){
    return jwt.sign(obj, basic_config.session_secret_key);
}
const saltRounds = 10;
const generatePasswordHash = function(password){
    var salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
}
const verifyPassword = function(pass, dbpass){
    return bcrypt.compareSync(pass, dbpass);
}


// var signedInUserDetails = null;
const signedInUserDetails = function(){
    var user = firebase.auth().currentUser;
    if (user) {
        return user;
    } else {
        return null
    }
}
exports.saveNewPost = function(obj, callback) {
    return database.ref('allpost/' + obj.datetime).set(obj, function(error) {
        if (error) {
          return callback('Unable to save data against: '+ obj.title+' Please retry.')
        } else {
          return callback('Data successfull saved against: '+ obj.title)
        }
    });
}

exports.fetchPosts = function(callback) {
    return firebase.database().ref('/allpost').once('value',
        function(snapshot) {
            return callback(snapshot.val())
        },
        function(err) {
            return callback('Error fetching data , try again.')
        }
    );
}

exports.fetchAuthor = function(authorEmail, callback) {
    return firebase.database().ref('/allusers/' + authorEmail).once('value',
        function(snapshot) {
            return callback(snapshot.val())
        },
        function(err) {
            return callback('Error fetching author details , try again.')
        }
    );
}

exports.saveComment = function(postid, obj, callback) {
    return database.ref('allpost/' + postid + '/comments').once('value',
        function(snapshot) {
            if(snapshot.val() !== null){
                //if comments exists in post
                var newPostKey = database.ref('allpost/postid').child('comments').push().key;

                var newobj = {};
                var prevcomment = Object.keys(snapshot.val());
                for(var i =0; i< prevcomment.length; i++){
                    newobj[prevcomment[i]] = snapshot.val()[prevcomment[i]];
                }
                newobj[obj.id] = obj;

                var updates = {};
                updates['/allpost/' + postid +'/comments'] = newobj;

                return database.ref().update(updates,  
                    function(error) {
                        if (error) {
                            return callback('Error pushing comments , try again.')
                        } else {
                            return callback('Comment successfully saved.')
                        }
                    }
                );

            }else{
                //if comments does not exists in post
                var newPostKey = database.ref('allpost/postid').child('comments').push().key;

                var newobj = {};
                newobj[obj.id] = obj;

                var updates = {};
                updates['/allpost/' + postid +'/comments'] = newobj;

                return database.ref().update(updates,  
                    function(error) {
                        if (error) {
                            return callback('Error pushing comments , try again.')
                        } else {
                            return callback('Comment successfully saved.')
                        }
                    }
                );
            }
        },
        function(err) {
            return callback('Error fetching data , try again.')
        }
    );
}
exports.authenticateUser = function(obj, callback) {
    // username and password is simply stored in database
    return firebase.database().ref('auth/' + utilFunc.convertDotToComma(obj.email) )
        .once('value', function(snapshot) {
            var username = (snapshot.val() && snapshot.val().email) || 'Anonymous';
            if(username === 'Anonymous'){
                return callback({
                    result : 'error',
                    message : 'UserId does not exist.'
                })
            }else{
                const passValid = verifyPassword(obj.password, snapshot.val().password)
                if(!passValid){
                    return callback({
                        result : 'error',
                        message : 'Password does not match.'
                    })
                }else{
                    return callback({
                        result : 'success',
                        token : getSecretJWTToken({
                            email : obj.email
                        })
                    })
                }
            }
        },
        function(err) {
            return callback({
                result : "error",
                message : err.message
            })
        })
}

exports.newAuthenticateUser = function(obj, callback) {
    // username and password is simply stored in database

    obj.password = generatePasswordHash(obj.password);  // generatePasswordHash();

    return firebase.database().ref('auth/' + utilFunc.convertDotToComma(obj.email) )
        .once('value', function(snapshot) {
            var username = (snapshot.val() && snapshot.val().email) || 'Anonymous';
            if(username === 'Anonymous'){
                return database.ref('/auth/' + utilFunc.convertDotToComma(obj.email) ).set(obj, function(error) {
                    if (error) {
                        return callback({
                            result : 'error',
                            message : 'Try sign up after some time.'
                        })
                    }else{
                        return callback({
                            result : 'success',
                            message : 'User successfully signed up: '+ obj.email
                        })
                    }
                });
            }else{
                return callback({
                    result : 'error',
                    message : 'User email already exists.'
                })
            }
        },
        function(err) {
            return callback({
                result : "error",
                message : err.message
            })
        })
}

// exports.currentUserDetails = function(callback) {
//     const userdetail = signedInUserDetails();
//     if(userdetail){
//         return firebase.database().ref('/allusers/' + userdetail.email.replace(/\./g, ",")).once('value',
//             function(snapshot) {
//                 return callback({
//                     result : 'success',
//                     content : snapshot.val()
//                 })
//             },
//             function(err) {
//                 return callback({
//                     result : "error",
//                     message : 'Error fetching data of user'
//                 })
//             }
//         );
//     }else{
//         return callback({
//             result : 'error',
//             message : 'No user signed in.'
//         })
//     }
// }
    
// exports.signOutUser = function(callback) {
//     return firebase.auth().signOut()
//         .then(function(response) {
//             return callback('Signed out successfully');
//         }).catch(function(err){
//             return callback('Couldnt sign out. Try again.');
//         });
// }
exports.createUserProfile = function(obj, callback) {
    return database.ref('allusers/' + utilFunc.convertDotToComma(obj.email) ).set(obj, function(error) {
        if (error) {
          return callback({
              result : 'error',
              message : 'Unable to save data against: '+ obj.email+' Please retry.'
          })
        } else {
          return callback({
              result : 'success',
              content : 'Data successfull saved against: '+ obj.email
          })
        }
    });
}
exports.fetchUserProfile = function(obj, callback) {
    return firebase.database().ref('/allusers/'+ utilFunc.convertDotToComma(obj.email) ).once('value',
        function(snapshot) {
            return callback({
                result : 'success',
                content : snapshot.val()
            })
        },
        function(err) {
            return callback({
                result : 'Error',
                content : 'Error fetching data , try again.'
            })
        }
    );
}
exports.updateUserpProfileData = function(obj, callback) {
    var updates = {};
    updates['/allusers/' + utilFunc.convertDotToComma(obj.email) ] = obj;

    return database.ref().update(updates,  
        function(error) {
            if (error) {
                return callback('Couldnt be updated now , try again later.')
            } else {
                return callback('Successfully updated.')
            }
        }
    );
}