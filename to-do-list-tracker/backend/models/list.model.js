const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listSchema = new Schema({
  topic: {
    type: String,
    required : true,
  },
  description: {
    type: String,
    required : true,
  },
  date: {
    type: Date,
    required : true,
  }
});

const List = mongoose.model('List', listSchema);

module.exports = List;