var app = require('./config/server');
var firebase = require('./config/dbConnection');

app.listen(8000, function(req,res){
	console.log("servidor On na porta 8000");
});