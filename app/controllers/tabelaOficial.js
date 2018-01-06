var firebase = require('firebase');
var fs = require("fs");

module.exports.index = function(app,req,res){
    var carrinho = [];

    res.render('tabelaOficial/home',{carrinho : carrinho});
}

module.exports.gerarOrcamento = function(app,req,res){

		//var produtos = JSON.parse(fs.readFileSync("tabelaOficial.json"));

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

        res.render('tabelaOficial/orcamento',{carrinho : carrinho, valorTotal : valorTotal});
}

module.exports.salvar = function(app,req,res){
    
    
}