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
    // //if comments exists in post

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
                // return callback(snapshot.val())
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
