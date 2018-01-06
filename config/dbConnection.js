var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyAimq7NMwJEhpmLrOTCZSU6X48QzK2oCiQ",
    authDomain: "alfredo-692b8.firebaseapp.com",
    databaseURL: "https://alfredo-692b8.firebaseio.com",
    projectId: "alfredo-692b8",
    storageBucket: "alfredo-692b8.appspot.com",
    messagingSenderId: "599701048232"
};

firebase.initializeApp(config);

module.exports = firebase;