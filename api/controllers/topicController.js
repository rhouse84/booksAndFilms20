'use strict';

var mongoose = require('mongoose');
var Topic = mongoose.model('Topic');

// Get Topics
module.exports.getTopics = function(req, res, next) {
	Topic.find({}, function(err, topics) {
		if (err) return next(err);
		res.json(topics);
	});
};

// Search Topics
module.exports.searchTopics = function(req, res, next) {
	var search = req.params._search;
	var regx = new RegExp(search, 'gi');
	Topic.find({ description: { $regex: regx } }, function(err, topics) {
		if (err) return next(err);
		res.json(topics);
	});
};

// Get Single Topic
module.exports.getTopic = function(req, res, next) {
	var id = req.params._id;
	Topic.findById(id, function(err, topic) {
		if (err) return next(err);
		res.json(topic);
	})
};

// Add Topic
module.exports.addTopic = function(req, res, next) {
	var topic = req.body;
	Topic.create(topic, function(err, topic) {
		if (err) return next(err);
		res.json(topic);
	})
};

// Update Topic
module.exports.updateTopic = function(req, res, next) {
	var query = {_id: req.params._id};
	var topic = req.body;
	Topic.update(query, topic, {}, function(err, topic) {
		if (err) return next(err);
		res.json(topic);
	})
};

// Remove Topic
module.exports.removeTopic = function(req, res, next) {
	var query = {_id: req.params._id};
	Topic.remove(query, function(err, topic) {
		if (err) return next(err);
		res.json(topic);
	})
};
