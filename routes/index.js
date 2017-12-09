var express = require('express');
var router = express.Router();

var firebase = require('firebase');

var database = firebase.database();

var email_usuario;
var senha_usuario;

function userAuthFirebase(userId, email, validoTermos) {
    database.ref('users/' + userId).set({
        email: email,
        termos : validoTermos
    });
}

router.get("/", function(req,res){

    var user = firebase.auth().currentUser;

    if(user){
        res.render('opcoes.ejs');
    }
    else {
        res.render('index.ejs');
    }
});

router.route('/criarConta')
    .get(function (req,res) {

        var user = firebase.auth().currentUser;

        if(user){
            res.render('opcoes.ejs');
        }
        else {
            res.render('index.ejs');
        }

    })
    .post(function (req,res) {
        email_usuario = req.body.criar_email;
        senha_usuario = req.body.criar_senha;
        res.render('termos.ejs');
});

router.route('/paginaPrincipal')
    .get(function (req,res) {
        var user = firebase.auth().currentUser;

        if(user){
            res.render('opcoes.ejs');
        }
        else {
            res.render('index.ejs');
        }
    })
    .post(function (req,res) {
        /* criar usuario */

        var email = email_usuario;
        var password = senha_usuario;

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                res.render('index.js');
            });

        var newPostKey = database.ref().child('posts').push().key;

        userAuthFirebase(newPostKey,email,false);

        res.render('opcoes.ejs');
});

router.route('/logar')
    .get(function (req,res) {

        var user = firebase.auth().currentUser;

        if(user){
            res.render('opcoes.ejs');
        }
        else {
            res.render('index.ejs');
        }
    })
    .post(function (req,res) {
        var email = req.body.email_login;
        var password = req.body.senha_login;
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        }).then(function (t) {
            var user = firebase.auth().currentUser;

            if(user){
                res.render('opcoes.ejs');
            }
            else {
                res.render('index.ejs');
            }
        });

});

router.route('/medio')
    .get(function (req,res) {

        var user = firebase.auth().currentUser;

        if(user){
            res.render('principal/precomedio.ejs');
        }
        else {
            res.render('index.ejs');
        }
    })
    .post(function (req,res) {
        res.render('principal/precomedio.ejs');
    });

router.route('/sair')
    .get(function (req,res) {

        var user = firebase.auth().currentUser;

        if(user){
            res.render('opcoes.ejs');
        }
        else {
            res.render('index.ejs');
        }
    })
    .post(function (req,res) {

        firebase.auth().signOut().then(function() {
            res.render('index.ejs');
        }).catch(function(error) {

        });

    });

router.route('/precomedio/orcamento')
    .get(function (req,res) {

        var user = firebase.auth().currentUser;

        if(user){
            res.render('opcoes.ejs');
        }
        else {
            res.render('index.ejs');
        }
    })
    .post(function (req,res) {
        var resp = req.body;

        console.log(resp);

    });

module.exports = router;
