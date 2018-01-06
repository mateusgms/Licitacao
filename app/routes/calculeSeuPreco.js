module.exports = function(application){

	application.get('/gerarOrcamentoCalculeSeuPreco', function(req,res){
		application.app.controllers.calculeSeuPreco.index(application,req,res);
	});

	application.post('/gerarOrcamentoCalculeSeuPreco', function(req,res){
		application.app.controllers.calculeSeuPreco.orcamento(application,req,res);
	});
}