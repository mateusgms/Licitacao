module.exports = function(application){

	application.get('/sair', function(req,res){
		application.app.controllers.home.sair_get(application,req,res);
	});

	application.post('/sair', function(req,res){
		application.app.controllers.home.sair_post(application,req,res);
	});

	application.all('/precoMedioTransacional', function(req,res){
		application.app.controllers.precoMedioTransacional.index(application,req,res);
	});

	application.all('/tabelaOficial', function(req,res){
		application.app.controllers.tabelaOficial.index(application,req,res);
	});	

	application.all('/calculeSeuPreco', function(req,res){
		application.app.controllers.calculeSeuPreco.index(application,req,res);
	});

}