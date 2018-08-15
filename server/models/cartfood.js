var mongoose = require('mongoose');

var cartfoodSchema = new mongoose.Schema({
  "account":String,
  "phone":String,
  "submitDate":String,
  "cartlist":Object
});
module.exports = mongoose.model("CartFood",cartfoodSchema);