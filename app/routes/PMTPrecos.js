module.exports = function(application){

	application.get('/gerarOrcamentoPMTPrecos', function(req,res){
		application.app.controllers.PMTPrecos.index(application,req,res);
	});

	application.post('/gerarOrcamentoPMTPrecos', function(req,res){
		application.app.controllers.PMTPrecos.gerarOrcamento(application,req,res);
	});

	application.get('/salvarPMTPrecos', function(req,res){
		application.app.controllers.PMTPrecos.index(application,req,res);
	});

	application.post('/salvarPMTPrecos', function(req,res){
		application.app.controllers.PMTPrecos.salvar(application,req,res);
	});

}