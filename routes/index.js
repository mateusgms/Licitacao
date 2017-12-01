var express = require('express');
var router = express.Router();

var firebase = require('firebase');

var database = firebase.database();

function writeUserData(userId, email, validoTermos) {
    database.ref('users/' + userId).set({
        email: email,
        termos : validoTermos
    });
}

router.get("/", function(req,res){
    /*se estiver logado redireciona para
    * pagina de opcoes caso ja tenha aceitado os termos
    * se nao tiver manda para pagina de termos*/
    res.render('index.ejs');
});

router.route('/criarConta')
    .get(function (req,res) {

    /*se estiver logado redireciona para
    * pagina de opcoes caso ja tenha aceitado os termos
    * se nao tiver manda para pagina de termos*/

        var user = firebase.auth().currentUser;

        if(user){
            console.log("oi");
        }
        else res.render('index.ejs');

    })
    .post(function (req,res) {
        /* criar usuario */
        var email = req.body.criar_email;
        var password = req.body.criar_senha;

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            res.render('index.js');
        });

        /*var newPostKey = database.ref().child('posts').push().key;

        writeUserData(newPostKey,email,false);*/

        res.render('termos.ejs');
});

router.route('/opcoes')
    .get(function (req,res) {
        var user = firebase.auth().currentUser;

        if(user){
            res.render('/opcoes');
        }
        else res.render('index.ejs');
    })
    .post(function (req,res) {
        res.render('opcoes.ejs');
});

router.route('/logar')
    .get(function (req,res) {
        /*se estiver logado redireciona para
    * pagina de opcoes caso ja tenha aceitado os termos
    * se nao tiver manda para pagina de termos*/
    })
    .post(function (req,res) {
        var email = req.body.email_login;
        var password = req.body.senha_login;
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });

        var user = firebase.auth().currentUser;

        if(user){
            /*verificar os termos*/
            res.render('opcoes.ejs');
        }
        else{
            res.render('index.ejs');
        }

});

module.exports = router;
