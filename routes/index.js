var fs = require("fs");
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

router.route('/medio')
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

        var produtos = JSON.parse(fs.readFileSync("../prod.txt"));

        var email = firebase.auth().currentUser.email.toString();

        /*acessa o banco de dados e carregar o dados em carrinho */
        var busca = firebase.database().ref('/');

        busca.once('value')
            .then(function (snap) {
                var codigos = [];
                var quantidades = [];
                for (var key in snap.val()) {
                    var elemento = snap.val()[key];
                    if(elemento.email.toString() === email){
                        codigos = elemento.codigo;
                        quantidades = elemento.quantidade;
                        break;
                    }
                }

                var carrinho = [];

                for(var i = 0; i < codigos.length; i++){
                    for(var j = 0; j < produtos['codigo'].length; j++){
                        if(produtos['codigo'][j] == codigos[i]){
                            var novo = {
                                codigo : produtos['codigo'][j],
                                nome : produtos['nome'][j],
                                vencimento : produtos['tempo'][j],
                                unidade : produtos['unidade'][j],
                                regiao : produtos['regiao'][j],
                                qtdp : produtos['qtd itens'][j],
                                preco : produtos['medio'][j],
                                quantidade : quantidades[i]
                            };
                            carrinho.push(novo);
                        }
                    }
                }

                res.render('principal/precomedio.ejs',{carrinho : carrinho});
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

        var produtos = JSON.parse(fs.readFileSync("../prod.txt"));

        var email = firebase.auth().currentUser.email.toString();

        var codigos = JSON.parse("[" + req.body.codigo + "]");
        var quantidades = JSON.parse("[" + req.body.quantidade + "]");

        var carrinho = [];

        /*cria carrinho*/
        for(var i = 0; i < codigos.length; i++){
            for(var j = 0; j < produtos['codigo'].length; j++){
                if(produtos['codigo'][j] == codigos[i]){
                    var novo = {
                        codigo : produtos['codigo'][j],
                        nome : produtos['nome'][j],
                        vencimento : produtos['tempo'][j],
                        unidade : produtos['unidade'][j],
                        regiao : produtos['regiao'][j],
                        qtdp : produtos['qtd itens'][j],
                        preco : produtos['medio'][j],
                        quantidade : quantidades[i]
                    };
                    carrinho.push(novo);
                }
            }
        }

        var busca = firebase.database().ref('/');

        /*apaga o carrinho antigo e insere o novo*/
        busca.once('value')
            .then(function (snap) {
                for (var key in snap.val()) {
                    var elemento = snap.val()[key];
                    if(elemento.email.toString() === email){
                        var caminho = '/' + key;
                        firebase.database().ref(caminho).remove();
                        break;
                    }
                }
                var inserir = busca.push();
                inserir.set({
                    email : email,
                    codigo : codigos,
                    quantidade : quantidades
                });
            });

        res.render('principal/orcamento.ejs',{carrinho : carrinho});

    });

module.exports = router;
