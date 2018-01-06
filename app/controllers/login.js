var firebase = require('firebase');

module.exports.index = function(app,req,res){
	
    var user = firebase.auth().currentUser;

    if(user){
        res.render('home');
    }
    else {
        res.render('login');
    }
}

module.exports.logar = function(app,req,res){
	
	var email = req.body.email_login;
    var password = req.body.senha_login;
    
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    }).then(function () {
        
        var user = firebase.auth().currentUser;

        if(user){
            res.render('home');
        }
        else {
            res.render('login');
        }
    });
}