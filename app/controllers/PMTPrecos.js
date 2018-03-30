var firebase = require('firebase');
var fs = require("fs");

module.exports.index = function(app,req,res){

    if(!req.session.logado){
        res.render('login');
    }

    var produtos = JSON.parse(fs.readFileSync("PMTPrecos.json"));

    var email = firebase.auth().currentUser.email.toString();

    /*acessa o banco de dados e carrega o dados em carrinho */
    var busca = firebase.database().ref('/');

    var chave = "PMTPrecos";

    busca.once('value')
        .then(function (snap) {
            var codigos = [];
            var quantidades = [];
            var precos = [];
            for (var key in snap.val()) {
                var elemento = snap.val()[key];
                if (elemento.email.toString() === email && elemento[chave] !== undefined) {
                    codigos = elemento[chave].codigo;
                    quantidades = elemento[chave].quantidade;
                    precos = elemento[chave].preco;
                    break;
                }
            }

            var carrinho = [];

            for (var i = 0; i < codigos.length; i++) {
                for (var j = 0; j < produtos.length; j++) {
                    if (produtos[j]["ID"].toString().trim() === codigos[i].toString().trim()) {
                        var novo = {
                            id: produtos[j]["ID"],
                            codigo: produtos[j]['CODIGO'],
                            nome: produtos[j]['NOME'],
                            grupo: produtos[j]['GRUPO'],
                            referencia: produtos[j]['REFERENCIA'],
                            cnpj: produtos[j]['CNPJ'],
                            pregao : produtos[j]['PREGOES'],
                            cotacoes : produtos[j]['NUMERO COTACOES'],
                            unidade: produtos[j]['UNIDADE'],
                            regiao: produtos[j]['REGIAO'],
                            descricao: produtos[j]['DESCRICAO'],
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

            res.render('PMTPrecos/home', {carrinho: carrinho});
        });
}

module.exports.gerarOrcamento = function(app,req,res){

    var produtos = JSON.parse(fs.readFileSync("PMTPrecos.json"));

    var email = firebase.auth().currentUser.email.toString();

    var codigos = JSON.parse("[" + req.body.codigo + "]");
    var quantidades = JSON.parse("[" + req.body.quantidade + "]");
    var precos = JSON.parse("[" + req.body.preco + "]");

    var carrinho = [];

    var valorTotal = 0;

    /*cria carrinho*/
    for(var i = 0; i < codigos.length; i++){
        for(var j = 0; j < produtos.length; j++){
            if(produtos[j]["ID"].toString().trim() === codigos[i].toString().trim()){
                var novo = {        
                    id: produtos[j]["ID"],
                    codigo: produtos[j]['CODIGO'],
                    nome: produtos[j]['NOME'],
                    grupo: produtos[j]['GRUPO'],
                    referencia: produtos[j]['REFERENCIA'],
                    cnpj: produtos[j]['CNPJ'],
                    pregao : produtos[j]['PREGOES'],
                    cotacoes : produtos[j]['NUMERO COTACOES'],
                    unidade: produtos[j]['UNIDADE'],
                    regiao: produtos[j]['REGIAO'],
                    descricao: produtos[j]['DESCRICAO'],
                    qtdp: produtos[j]['QUANTIDADE'],
                    precoFinal: parseFloat(precos[i]).toFixed(2),
                    quantidade: quantidades[i]
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
                    var caminho = '/' + key + '/PMTPrecos';
                    firebase.database().ref(caminho).remove();
                    if(carrinho.length > 0) {
                        firebase.database().ref(caminho).set({
                            codigo: codigos,
                            quantidade: quantidades,
                            preco: precos
                        });
                    }
                    break;
                }
            }
            
        });

    valorTotal = valorTotal.toFixed(2);

    res.render('PMTPrecos/orcamento', {carrinho : carrinho, valorTotal : valorTotal});
}

module.exports.salvar = function(app,req,res){
    
    
    var produtos = JSON.parse(fs.readFileSync("PMTPrecos.json"));

    var email = firebase.auth().currentUser.email.toString();

    var codigos = JSON.parse("[" + req.body.codigo + "]");
    var quantidades = JSON.parse("[" + req.body.quantidade + "]");
    var precos = JSON.parse("[" + req.body.preco + "]");

    var carrinho = [];

    var valorTotal = 0;

    /*cria carrinho*/
    for(var i = 0; i < codigos.length; i++){
        for(var j = 0; j < produtos.length; j++){
            if(produtos[j]["ID"].toString().trim() === codigos[i].toString().trim()){
                var novo = {        
                    id: produtos[j]["ID"],
                    codigo: produtos[j]['CODIGO'],
                    nome: produtos[j]['NOME'],
                    grupo: produtos[j]['GRUPO'],
                    referencia: produtos[j]['REFERENCIA'],
                    cnpj: produtos[j]['CNPJ'],
                    pregao : produtos[j]['PREGOES'],
                    cotacoes : produtos[j]['NUMERO COTACOES'],
                    unidade: produtos[j]['UNIDADE'],
                    regiao: produtos[j]['REGIAO'],
                    descricao: produtos[j]['DESCRICAO'],
                    qtdp: produtos[j]['QUANTIDADE'],
                    precoMinimo: parseFloat(produtos[j]['MINIMO']).toFixed(2),
                    precoMedio: parseFloat(produtos[j]['MEDIA']).toFixed(2),
                    precoMaximo: parseFloat(produtos[j]['MAXIMO']).toFixed(2),
                    precoFinal: parseFloat(precos[i]).toFixed(2),
                    quantidade: quantidades[i]
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
                    var caminho = '/' + key + '/PMTPrecos';
                    firebase.database().ref(caminho).remove();
                    if(carrinho.length > 0) {
                        firebase.database().ref(caminho).set({
                            codigo: codigos,
                            quantidade: quantidades,
                            preco: precos
                        });
                    }
                    break;
                }
            }
            
        });

    res.render('PMTPrecos/home', {carrinho : carrinho});
}