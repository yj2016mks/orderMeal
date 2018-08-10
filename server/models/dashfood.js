var mongoose = require('mongoose');

var dashfoodSchema = new mongoose.Schema({
  "imgurl":String,
  "name":String,
  "seller":String,
  "remark":String,
  "authority":Boolean,
  "num":Number,
  "shownoticebefore":Boolean
});
module.exports = mongoose.model("DashFood",dashfoodSchema);