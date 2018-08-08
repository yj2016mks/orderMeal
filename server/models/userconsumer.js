var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  "name":String,
  "phone":String,
  "account":String,
  "password":String,
  "authority":Boolean,
  "remark":String,
});
module.exports = mongoose.model("User",userSchema);