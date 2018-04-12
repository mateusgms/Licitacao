module.exports.index = function(app,req,res){
	res.render('calculeSeuPreco/home');
}

module.exports.orcamento = function(app,req,res){

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

    res.render('calculeSeuPreco/orcamento', {carrinho : carrinho, item : item});
}