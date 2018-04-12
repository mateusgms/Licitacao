module.exports = function(application){

	application.get('/gerarOrcamentoPMTCompras', function(req,res){
		application.app.controllers.PMTCompras.index(application,req,res);
	});

	application.post('/gerarOrcamentoPMTCompras', function(req,res){
		application.app.controllers.PMTCompras.gerarOrcamento(application,req,res);
	});

	application.get('/salvarPMTCompras', function(req,res){
		application.app.controllers.PMTCompras.index(application,req,res);
	});

	application.post('/salvarPMTCompras', function(req,res){
		application.app.controllers.PMTCompras.salvar(application,req,res);
	});

}