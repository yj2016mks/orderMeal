var mongoose = require('mongoose');

var dashfoodSchema = new mongoose.Schema({
  "imgurl":String,
  "name":String,
  "seller":String,
  "authority":Number,
  "remark":String
});
module.exports = mongoose.model("DashFood",dashfoodSchema);