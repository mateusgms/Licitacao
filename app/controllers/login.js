var firebase = require('firebase');

module.exports.index = function(app,req,res){

    if(req.session.logado){
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

        console.log('errou email/senha');
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    }).then(function () {

        req.session.logado = true;
        
        res.render('home');

    });
}