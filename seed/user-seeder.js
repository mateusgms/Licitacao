var User = require('../models/user');
var mongoose = require('mongoose');

mongoose.connect('localhost:27017/lic');

var user = new User({
   email: "bittencourtandre@hotmail.com",
   termos: false
});

user.save(function (err,result) {
    exit();
});

function exit() {
    mongoose.disconnect();
}



