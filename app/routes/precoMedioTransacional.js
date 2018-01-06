module.exports = function(application){

	application.get('/gerarOrcamentoPrecoMedioTransacional', function(req,res){
		application.app.controllers.precoMedioTransacional.index(application,req,res);
	});

	application.post('/gerarOrcamentoPrecoMedioTransacional', function(req,res){
		application.app.controllers.precoMedioTransacional.gerarOrcamento(application,req,res);
	});

	application.get('/salvarPrecoMedioTransacional', function(req,res){
		application.app.controllers.precoMedioTransacional.index(application,req,res);
	});

	application.post('/salvarPrecoMedioTransacional', function(req,res){
		application.app.controllers.precoMedioTransacional.salvar(application,req,res);
	});

}