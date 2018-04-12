'use strict';

var mongoose = require('mongoose');
var Topic = mongoose.model('Topic');

// Get Topics
module.exports.getTopics = function(req, res) {
	Topic.find({}, function(err, topics) {
		if (err) {
			throw err;
		}
		res.json(topics);
	});
};

// Get Single Topic
module.exports.getTopic = function(req, res) {
	var id = req.params._id;
	Topic.findById(id, function(err, topic) {
		if (err) {
			throw err;
		}
		res.json(topic);
	})
};

// Add Topic
module.exports.addTopic = function(req, res) {
	var topic = req.body;
	Topic.create(topic, function(err, topic) {
		if (err) {
			throw err;
		}
		res.json(topic);
	})
};

// Update Topic
module.exports.updateTopic = function(req, res) {
	var id = req.params._id;
	var topic = req.body;
	Topic.findOneAndUpdate(id, topic, {}, function(err, topic) {
		if (err) {
			throw err;
		}
		res.json(topic);
	})
};

// Remove Topic
module.exports.removeTopic = function(req, res) {
	var query = {_id: req.params._id};
	Topic.remove(query, function(err, topic) {
		if (err) {
			throw err;
		}
		res.json(topic);
	})
};
