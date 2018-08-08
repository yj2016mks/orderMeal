var mongoose = require('mongoose');

var usersystemSchema = new mongoose.Schema({
    "name":String,
    "password":String,
});
module.exports = mongoose.model('Usersystem',usersystemSchema);