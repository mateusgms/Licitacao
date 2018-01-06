var firebase = require('firebase');
var fs = require("fs");

module.exports.index = function(app,req,res){

	var user = firebase.auth().currentUser;

    if(!user){
        res.render('login');
    }

    var produtos = JSON.parse(fs.readFileSync("prod.json"));

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
                            precoMinimo: parseFloat(produtos[j]['MINIMO']).toFixed(2),
                            precoMedio: parseFloat(produtos[j]['MEDIA']).toFixed(2),
                            precoMaximo: parseFloat(produtos[j]['MAXIMO']).toFixed(2),
                            precoFinal: parseFloat(precos[i]).toFixed(2),
                            quantidade: quantidades[i]
                        };
                        carrinho.push(novo);
                    }
                }
            }

            res.render('PrecoMedioTransacional/home', {carrinho: carrinho});
        });
}

module.exports.gerarOrcamento = function(app,req,res){

    var produtos = JSON.parse(fs.readFileSync("prod.json"));

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

    valorTotal = valorTotal.toFixed(2);

    res.render('PrecoMedioTransacional/orcamento', {carrinho : carrinho, valorTotal : valorTotal});
}

module.exports.salvar = function(app,req,res){
    
    var produtos = JSON.parse(fs.readFileSync("prod.json"));

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

    res.render('PrecoMedioTransacional/home', {carrinho : carrinho});
}