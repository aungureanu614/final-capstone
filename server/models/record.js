var mongoose = require("mongoose");

var RecordSchema = new mongoose.Schema({
  name: {type:String},
  rating: {type: Array}
});

var Record = mongoose.model("Record", RecordSchema);

module.exports = Record;
