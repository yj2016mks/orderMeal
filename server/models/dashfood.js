var mongoose = require('mongoose');

var dashfoodSchema = new mongoose.Schema({
  "imgurl":String,
  "name":String,
  "seller":String,
  "remark":String,
  "authority":Boolean,
  "num":Number
});
module.exports = mongoose.model("DashFood",dashfoodSchema);