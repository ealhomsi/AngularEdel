var mongoose = require('mongoose');

var boardSchema = mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    parentTopicId: Number
});

var Board = mongoose.model('Board', boardSchema);

module.exports = Board;