var mongoose = require('mongoose');

var topicSchema = mongoose.Schema({
    parentForumId: Number,
    subjectText: String,
    author: String,
    posts: Array
});

var Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;