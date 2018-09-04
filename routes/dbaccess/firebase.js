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

exports.fetchPosts = function(callback) {
    return firebase.database().ref('/allpost').on('value',
        function(snapshot) {
            return callback(snapshot.val())
        },
        function(err) {
            return callback('Error fetching data , try again.')
        }
    );
}