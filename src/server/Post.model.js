var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    parentTopicId: Number,
    author: String,
    bodyText: String,
    posts: Array
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;