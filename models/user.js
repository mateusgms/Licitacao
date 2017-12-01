var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usuario = new Schema({
    email: {type: 'String', required: true},
    termos: {type: Boolean, required: true}
});

module.exports = mongoose.model('user', usuario);