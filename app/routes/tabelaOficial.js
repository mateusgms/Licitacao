module.exports = function(application){

	application.get('/gerarOrcamentoTabelaOficial', function(req,res){
		application.app.controllers.tabelaOficial.index(application,req,res);
	});

	application.post('/gerarOrcamentoTabelaOficial', function(req,res){
		application.app.controllers.tabelaOficial.gerarOrcamento(application,req,res);
	});

	application.get('/salvarTabelaOficial', function(req,res){
		application.app.controllers.tabelaOficial.index(application,req,res);
	});

	application.post('/salvarTabelaOficial', function(req,res){
		application.app.controllers.tabelaOficial.salvar(application,req,res);
	});

}