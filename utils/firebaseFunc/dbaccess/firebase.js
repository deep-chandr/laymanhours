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



var currentUserDetails = null;
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      currentUserDetails = {};
      currentUserDetails.displayName = user.displayName;
      currentUserDetails.email = user.email;
      currentUserDetails.age = user.age;
      currentUserDetails.gender = user.gender;
      currentUserDetails.about = user.about;
      currentUserDetails.emailVerified = user.emailVerified;
      currentUserDetails.photoURL = user.photoURL;
      currentUserDetails.isAnonymous = user.isAnonymous;
      currentUserDetails.uid = user.uid;
      currentUserDetails.providerData = user.providerData;
    } else {
        currentUserDetails = null;
        // User is signed out.
    }
});
exports.saveNewPost = function(obj, callback) {
    return database.ref('allpost/' + obj.datetime).set(obj, function(error) {
        if (error) {
          return callback('Unable to save data against: '+ obj.title+' Please retry.')
        } else {
          return callback('Data successfull saved against: '+ obj.title)
        }
    });
}
exports.saveNewAuthor = function(obj, callback) {
    return database.ref('allauthors/' + obj.name).set(obj, function(error) {
        if (error) {
          return callback('Error occured. Retry.')
        } else {
          return callback('Author saved to db : ' + obj.name)
        }
    });
}

exports.fetchPosts = function(callback) {
    return firebase.database().ref('/allpost').once('value',
        function(snapshot) {
            return callback(snapshot.val())
            // return callback('hello')
        },
        function(err) {
            return callback('Error fetching data , try again.')
        }
    );
}

exports.fetchAuthor = function(authorName, callback) {
    return firebase.database().ref('/allauthors/' + authorName).once('value',
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
            return callback({
                result : 'success'
            })
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
            return callback({
                result: 'success',
                content : 'Signup successful.'
            })
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
    return callback(currentUserDetails);
}
exports.signOutUser = function(callback) {
    firebase.auth().signOut()
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
            console.log('current user profile--------', snapshot.val())
            return callback(snapshot.val())
        },
        function(err) {
            return callback('Error fetching data , try again.')
        }
    );
}
exports.updateUserpProfileData = function(obj, callback) {
    var updates = {};
    updates['/allusers/' + obj.email.replace('.',',') ] = obj;
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