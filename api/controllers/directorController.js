'use strict';

var mongoose = require('mongoose');
var Director = mongoose.model('Director');

// Get Directors
module.exports.getDirectors = function(req, res, next) {
	Director.find({}, function(err, directors) {
		if (err) return next(err);
		res.json(directors);
	});
};

// Get Single Director
module.exports.getDirector = function(req, res, next) {
	var id = req.params._id;
	Director.findById(id, function(err, director) {
		if (err) return next(err);
		res.json(director);
	})
};

// Add Director
module.exports.addDirector = function(req, res, next) {
	var director = req.body;
	Director.create(director, function(err, director) {
		if (err) return next(err);
		res.json(director);
	})
};

// Update Director
module.exports.updateDirector = function(req, res, next) {
	var id = req.params._id;
	var director = req.body;
	Director.findOneAndUpdate(id, director, {}, function(err, director) {
		if (err) return next(err);
		res.json(director);
	})
};

// Remove Director
module.exports.removeDirector = function(req, res, next) {
	var query = {_id: req.params._id};
	Director.remove(query, function(err, director) {
		if (err) return next(err);
		res.json(director);
	})
};
