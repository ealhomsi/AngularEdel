var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Express server settings.
var app = express();
app.set('port', (3000));
app.use('/', express.static(__dirname + '/../../dist')); // Use compiled build.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Logging.
app.use(morgan('dev'));

// Mongoose settings.
mongoose.connect('mongodb://localhost:27017/forum');
mongoose.Promise = global.Promise;
var db = mongoose.connection;

var Board = require('./Board.model.js');
var Topic = require('./Topic.model.js');
var Post = require('./Post.model.js');

/**
 * Implemented signatures:
 * 
 * - Get the posts inside of a parent topic.
 * app.get('/api/v1/posts/:parentTopic', function (req, res);
 *
 * - Get all boards of the forum.
 * app.get('/api/v1/boards', function (req, res);
 * 
 * - Get all topics of a board by parent ID.
 * app.get('/api/v1/get-topics/:parentForumId', function (req, res);
 * 
 * - Create a new topic.
 * app.post('/api/v1/create-topic', function (req, res) {
 * 
 * - Create a reply inside of a topic.
 * app.post('/api/v1/create-reply', function (req, res) {
 * 
 */

// Check for connection error.
db.on('error', console.error.bind(console, 'Connection error: '));

db.once('open', function () {
  console.log('Connected to MongoDB.');

  /**
   * Get all posts of a topic by parent ID.
   * Request model: { parentTopic: '5849c21584a15f307812a925' }
   * 
   */
  app.get('/api/v1/posts/:parentTopic', function (req, res) {
    Topic.findOne({ _id: req.params.parentTopic }, function (err, obj) {
      if (err) return console.error(err);
      res.json(obj);
    });
  });

  /**
   * NYI - Get all forums of a board.
   * 
   */
  app.get('/api/v1/boards', function (req, res) {
    Board.find({}, function (err, docs) {
      if (err) return console.error(err);
      res.json(docs);
    });
  });

  /**
   * Get all the topics inside of a forum.
   * Request model: { parentForumId: '1' }
   * 
   */
  app.get('/api/v1/topics/:parentForumId', function (req, res) {
    Topic.find({ parentForumId: req.params.parentForumId }, function (err, obj) {
      if (err) return console.error(err);
      res.json(obj);
    });
  });

  /**
   * Create a new topic.
   * Request model: { parentForumId: 1, subjectText: 'asdf', author: 'Administrator', bodyText: 'Hello' }
   * 
   */
  app.post('/api/v1/create-topic', function (req, res) {
    var newTopic = req.body;
    newTopic.posts = [{
      author: req.body.author,
      bodyText: req.body.bodyText
    }];

    var topic = new Topic(newTopic);
    topic.save((err, obj) => {
      if (err) return console.error(err);
      res.status(200).json(obj);
    });
  });

  /**
   * Reply to a post.
   * Request model:  { parentTopicId: '5849c21584a15f307812a925', author: 'Administrator', bodyText: 'Hello' }
   * 
   */
  app.post('/api/v1/create-reply', function (req, res) {
    console.log(req.body);
    var newReply = req.body;

    // Check that the topic exists.
    Topic.findOne({ parentForumId: req.params.parentTopicId }, function (err, document) {
      if (err) return res.sendStatus(404);

      // Add the topic to the posts array.
      Topic.update(
        { _id: req.body.parentTopicId },
        {
          $push: {
            posts: {
              author: req.body.author,
              bodyText: req.body.bodyText
            }
          }
        }, (error, affectedRows) => {
          if (error) return console.error(error);
          res.sendStatus(200);
        });
    });
  });

  // All other routes will be handled by angular.
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '/../../dist/index.html'));
  });

  // Bind the server to port.
  app.listen(app.get('port'), function () {
    console.log('App running on port ' + app.get('port'));
  });
});

module.exports = app;