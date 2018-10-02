var firebase = require("firebase");
var config = {
    apiKey: "AIzaSyCZgi2EX3zjsltVWOh1OJYIeYKT8AKPJbk",
    authDomain: "layman-hours.firebaseapp.com",
    databaseURL: "https://layman-hours.firebaseio.com",
    projectId: "layman-hours",
    storageBucket: "layman-hours.appspot.com",
    messagingSenderId: "172899416295"
};
firebase.initializeApp(config);
const database = firebase.database();



// var signedInUserDetails = null;
const signedInUserDetails = function(){

    var user = firebase.auth().currentUser;
    if (user) {
    // User is signed in.
        return user;
    } else {
    // No user is signed in.
        return null
    }
    // return firebase.auth().currentUser(function(user) {
    //     if (user) {
    //         return user;
    //     }else{
    //         return 0
    //     }
    // });
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
    return firebase.auth().signInWithEmailAndPassword(obj.email, obj.password)
        .then(function(response) {
            return firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                  // User is signed in.
                  return callback({
                    result : 'success',
                    content : user
                  })
                } else {
                  // No user is signed in.
                  return callback({
                    result : 'error',
                    message : 'No user signed in'
                  })
                }
            });
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            return callback({
                result : 'error',
                message : errorMessage
            })
        });
}

exports.newAuthenticateUser = function(obj, callback) {
    return firebase.auth().createUserWithEmailAndPassword(obj.email, obj.password)
        .then(function(response) {
            return firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                  // User is signed in.
                  return callback({
                    result : 'success',
                    content : user
                  })
                } else {
                  // No user is signed in.
                  return callback({
                    result : 'error',
                    message : 'No user signed in'
                  })
                }
            });
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            return callback({
                result : 'error',
                message : errorMessage
            })
        });
}

exports.currentUserDetails = function(callback) {
    const userdetail = signedInUserDetails();
    if(userdetail){
        return firebase.database().ref('/allusers/' + userdetail.email.replace(/\./g, ",")).once('value',
            function(snapshot) {
                return callback({
                    result : 'success',
                    content : snapshot.val()
                })
            },
            function(err) {
                return callback({
                    result : "success",
                    content : 'Error fetching data of user'
                })
            }
        );
    }else{
        return callback({
            result : 'error',
            message : 'No user signed in.'
        })
    }
}
    
exports.signOutUser = function(callback) {
    return firebase.auth().signOut()
        .then(function(response) {
            return callback('Signed out successfully');
        }).catch(function(err){
            return callback('Couldnt sign out. Try again.');
        });
}
exports.createUserProfile = function(obj, callback) {
    return database.ref('allusers/' + obj.email.replace('.',',')).set(obj, function(error) {
        if (error) {
          return callback('Unable to save data against: '+ obj.email+' Please retry.')
        } else {
          return callback('Data successfull saved against: '+ obj.email)
        }
    });
}
exports.fetchUserProfile = function(obj, callback) {
    return firebase.database().ref('/allusers/'+ obj.email.replace('.',',') ).once('value',
        function(snapshot) {
            return callback(snapshot.val())
        },
        function(err) {
            return callback('Error fetching data , try again.')
        }
    );
}
exports.updateUserpProfileData = function(obj, callback) {
    var updates = {};
    updates['/allusers/' + obj.email.replace(/\./g,',') ] = obj;

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