var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressSession = require('express-session');

var app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static('./app/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressSession({
	secret : 'dsakdjsak213k',
	resave : false,
	saveUninitialized : false
}));

consign()
	.include('app/routes')
	.then('app/controllers')
	.into(app);


module.exports = app;