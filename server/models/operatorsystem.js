var mongoose = require('mongoose');

var operatorsystemSchema = new mongoose.Schema({
    "deadchecked":Number,
    "remindchecked":Number,
    "authority":Boolean,
    "deadlines":Array,
    "reminds":Array
});
module.exports = mongoose.model("OperatorSystem",operatorsystemSchema);