module.exports = function(application){

	application.all('/', function(req,res){
		application.app.controllers.login.index(application,req,res);
	});

	application.get('/logar', function(req,res){
		application.app.controllers.login.index(application,req,res);
	});

	application.post('/logar', function(req,res){
		application.app.controllers.login.logar(application,req,res);
	});
	
}