var firebase = require('firebase');

module.exports.sair_get = function(app,req,res){

	var user = firebase.auth().currentUser;

    if(user){
        res.render('home');
    }
    else {
        res.render('login');
    }
}

module.exports.sair_post = function(app,req,res){

	firebase.auth().signOut().then(function() {
        res.render('login');
    }).catch(function(error) {
    	// erro
    });
}

