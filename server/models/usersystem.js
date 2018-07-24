var mongoose = require('mongoose');

var usersystemSchema = new mongoose.Schema({
    "name":String,
    "phone":String,
    "account":String,
    "authority":String,
    "remark":String,
});
module.exports = mongoose.model('Usersystem',usersystemSchema);