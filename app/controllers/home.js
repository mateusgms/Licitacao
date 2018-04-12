var firebase = require('firebase');

module.exports.sair_get = function(app,req,res){

    if(req.session.logado){
        res.render('home');
    }
    else {
        res.render('login');
    }
}

module.exports.sair_post = function(app,req,res){

	firebase.auth().signOut().then(function() {
        req.session.destroy(function(){
            res.render('login');
        });
    }).catch(function(error) {
    	// erro
    });
}

