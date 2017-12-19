var fs = require("fs");
var express = require('express');
var router = express.Router();

var firebase = require('firebase');

var database = firebase.database();

var email_usuario;
var senha_usuario;

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
                res.render('index.ejs',{erro : 'erro'});
            })
            .then(function (t) {
                res.render('opcoes.ejs');
            });
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
        }).then(function () {
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

router.all('/medio',function (req,res) {
    var user = firebase.auth().currentUser;

    if(!user){
        res.render('index.ejs');
    }

    var produtos = JSON.parse(fs.readFileSync("../prod.json"));

    var email = firebase.auth().currentUser.email.toString();

    /*acessa o banco de dados e carrega o dados em carrinho */
    var busca = firebase.database().ref('/');

    busca.once('value')
        .then(function (snap) {
            var codigos = [];
            var quantidades = [];
            var precos = [];
            var regioes = [];
            for (var key in snap.val()) {
                var elemento = snap.val()[key];
                if (elemento.email.toString() === email) {
                    codigos = elemento.codigo;
                    quantidades = elemento.quantidade;
                    precos = elemento.preco;
                    regioes = elemento.regiao;
                    break;
                }
            }

            var carrinho = [];

            for (var i = 0; i < codigos.length; i++) {
                for (var j = 0; j < produtos.length; j++) {
                    if (produtos[j]["CODIGO"].toString().trim() === codigos[i].toString().trim()
                        && produtos[j]["REGIAO"].toString().trim() === regioes[i].toString().trim()) {
                        var novo = {
                            codigo: produtos[j]['CODIGO'],
                            nome: produtos[j]['NOME'],
                            vencimento: produtos[j]['DATA'],
                            unidade: produtos[j]['UNIDADE'],
                            regiao: regioes[i],
                            especificacao: produtos[j]['DESCRICAO'],
                            qtdp: produtos[j]['QUANTIDADE'],
                            precoMinimo: produtos[j]['MINIMO'],
                            precoMedio: produtos[j]['MEDIA'],
                            precoMaximo: produtos[j]['MAXIMO'],
                            precoFinal: precos[i],
                            quantidade: quantidades[i]
                        };
                        carrinho.push(novo);
                    }
                }
            }

            res.render('principal/precomedio.ejs', {carrinho: carrinho});
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

        var produtos = JSON.parse(fs.readFileSync("../prod.json"));

        var email = firebase.auth().currentUser.email.toString();

        var codigos = JSON.parse("[" + req.body.codigo + "]");
        var quantidades = JSON.parse("[" + req.body.quantidade + "]");
        var precos = JSON.parse("[" + req.body.preco + "]");
        var regioes = req.body.regiao.split(',');

        var carrinho = [];

        var valorTotal = 0;

        /*cria carrinho*/
         for(var i = 0; i < codigos.length; i++){
             for(var j = 0; j < produtos.length; j++){
                 if(produtos[j]["CODIGO"].toString().trim() === codigos[i].toString().trim()
                     && produtos[j]["REGIAO"].toString().trim() === regioes[i].toString().trim()){
                     var novo = {
                         codigo : produtos[j]['CODIGO'],
                         nome : produtos[j]['NOME'],
                         vencimento : produtos[j]['DATA'],
                         unidade : produtos[j]['UNIDADE'],
                         regiao : regioes[i],
                         especificacao : produtos[j]['DESCRICAO'],
                         qtdp : produtos[j]['QUANTIDADE'],
                         precoFinal : precos[i],
                         quantidade : quantidades[i]
                     };
                     valorTotal += parseFloat(precos[i])*parseInt(quantidades[i]);
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
                 if(carrinho.length > 0) {
                     var inserir = busca.push();
                     inserir.set({
                         email: email,
                         codigo: codigos,
                         quantidade: quantidades,
                         preco: precos,
                         regiao : regioes
                     });
                 }
             });

         res.render('principal/orcamentomedio.ejs',{carrinho : carrinho, valorTotal : valorTotal});

    });

router.route('/precomedio/salvar')
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

        var produtos = JSON.parse(fs.readFileSync("../prod.json"));

        var email = firebase.auth().currentUser.email.toString();

        var codigos = JSON.parse("[" + req.body.codigo + "]");
        var quantidades = JSON.parse("[" + req.body.quantidade + "]");
        var precos = JSON.parse("[" + req.body.preco + "]");
        var regioes = req.body.regiao.split(',');

        var carrinho = [];

        var valorTotal = 0;

        /*cria carrinho*/
        for(var i = 0; i < codigos.length; i++){
            for(var j = 0; j < produtos.length; j++){
                if(produtos[j]["CODIGO"].toString().trim() === codigos[i].toString().trim()
                    && produtos[j]["REGIAO"].toString().trim() === regioes[i].toString().trim()){
                    var novo = {
                        codigo : produtos[j]['CODIGO'],
                        nome : produtos[j]['NOME'],
                        vencimento : produtos[j]['DATA'],
                        unidade : produtos[j]['UNIDADE'],
                        regiao : regioes[i],
                        especificacao : produtos[j]['DESCRICAO'],
                        qtdp : produtos[j]['QUANTIDADE'],
                        precoFinal : precos[i],
                        quantidade : quantidades[i]
                    };
                    valorTotal += parseFloat(precos[i])*parseInt(quantidades[i]);
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
                if(carrinho.length > 0) {
                    var inserir = busca.push();
                    inserir.set({
                        email: email,
                        codigo: codigos,
                        quantidade: quantidades,
                        preco: precos,
                        regiao : regioes
                    });
                }
            });

        carrinho = [];

        for(var i = 0; i < codigos.length; i++){
            for(var j = 0; j < produtos.length; j++){
                if(produtos[j]["CODIGO"].toString().trim() === codigos[i].toString().trim()
                    && produtos[j]["REGIAO"].toString().trim() === regioes[i].toString().trim()){
                    var novo = {
                        codigo : produtos[j]['CODIGO'],
                        nome : produtos[j]['NOME'],
                        vencimento : produtos[j]['DATA'],
                        unidade : produtos[j]['UNIDADE'],
                        regiao : regioes[i],
                        especificacao : produtos[j]['DESCRICAO'],
                        qtdp : produtos[j]['QUANTIDADE'],
                        precoMinimo : produtos[j]['MINIMO'],
                        precoMedio : produtos[j]['MEDIA'],
                        precoMaximo : produtos[j]['MAXIMO'],
                        precoFinal : precos[i],
                        quantidade : quantidades[i]
                    };
                    carrinho.push(novo);
                }
            }
        }

        res.render('principal/precomedio.ejs',{carrinho : carrinho});

    });

router.all('/tabelaOficial',function (req,res) {
    carrinho = [];

    res.render('principal/tabelaOficial.ejs',{carrinho : carrinho});
});

router.all('/calculePreco',function (req,res) {
    var user = firebase.auth().currentUser;

    if(user){
        res.render('principal/calcule')
    }
    else {
        res.render('index.ejs');
    }

});

router.route('/tabelaOficial/orcamento')
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

        //var produtos = JSON.parse(fs.readFileSync("../tabelaOficial.json"));

        var email = firebase.auth().currentUser.email.toString();

        var codigos = JSON.parse("[" + req.body.codigo + "]");
        var quantidades = JSON.parse("[" + req.body.quantidade + "]");
        var gov = JSON.parse("[" + req.body.gov + "]");

        var carrinho = [];

        var valorTotal = 0;

        /*cria carrinho*/
        for(var i = 0; i < codigos.length; i++){
            for(var j = 0; j < produtos.length; j++){
                if(produtos[j]["CODIGO"].toString().trim() === codigos[i].toString().trim()
                    && produtos[j]["gov"].toString().trim() === gov[i].toString().trim()){
                    var novo = {
                        codigo : produtos[j]['CODIGO'],
                        nome : produtos[j]['NOME'],
                        especificacao : produtos[j]['DESCRICAO'],
                        vencimento : produtos[j]['DATA'],
                        unidade : produtos[j]['UNIDADE'],
                        gov : gov[i],
                        preco: produtos[j]['preco'],
                        quantidade : quantidades[i],
                        link : produtos[j]['link']
                    };
                    valorTotal += parseFloat(precos[i])*parseInt(quantidades[i]);
                    carrinho.push(novo);
                }
            }
        }

        // var busca = firebase.database().ref('/');
        //
        // /*apaga o carrinho antigo e insere o novo*/
        // busca.once('value')
        //     .then(function (snap) {
        //         for (var key in snap.val()) {
        //             var elemento = snap.val()[key];
        //             if(elemento.email.toString() === email){
        //                 var caminho = '/' + key;
        //                 firebase.database().ref(caminho).remove();
        //                 break;
        //             }
        //         }
        //         if(carrinho.length > 0) {
        //             var inserir = busca.push();
        //             inserir.set({
        //                 email: email,
        //                 codigo: codigos,
        //                 quantidade: quantidades,
        //                 preco: precos,
        //                 regiao : regioes
        //             });
        //         }
        //     });

        res.render('principal/orcamentoTabelaOficial.ejs',{carrinho : carrinho, valorTotal : valorTotal});

    });

router.route('/calcule/orcamento')
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

        //var produtos = JSON.parse(fs.readFileSync("../tabelaOficial.json"));

        console.log(req.body);

        var item = req.body.item;
        var razoes = JSON.parse("[" + req.body.razao + "]");
        var CNPJs = JSON.parse("[" + req.body.CNPJ + "]");
        var utilizados = JSON.parse("[" + req.body.utilizado + "]");
        var precos = JSON.parse("[" + req.body.preco + "]");

        var carrinho = [];

        for(var i = 0; i < razoes.length; i++){
            var novo = {
                razao : razoes[i],
                CNPJ : CNPJs[i],
                utilizado : utilizados[i],
                preco : precos[i]
            };
            carrinho.push(novo);
        }

        res.render('principal/orcamentoCalcula.ejs',{carrinho : carrinho, item : item});

    });

module.exports = router;
