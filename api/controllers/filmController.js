'use strict';

var mongoose = require('mongoose');
var Film = mongoose.model('Film');

// Get Films
module.exports.getFilms = function(req, res, next) {
	Film.find({}, function(err, films) {
		if (err) return next(err);
		res.json(films);
	});
};

// Get Films by Director
module.exports.getFilmsByDirector = function(req, res, next) {
	var directorId = req.params._directorId;
	Film.find({directorId:directorId}, function(err, films) {
		if (err) return next(err);
		res.json(films);
	});
};

// Get Single Film
module.exports.getFilm = function(req, res, next) {
	var id = req.params._id;
	Film.findById(id, function(err, film) {
		if (err) return next(err);
		res.json(film);
	})
};

// Add Film
module.exports.addFilm = function(req, res, next) {
	var film = req.body;
	Film.create(film, function(err, film) {
		if (err) return next(err);
		res.json(film);
	})
};

// Update Film
module.exports.updateFilm = function(req, res, next) {
	var query = {_id: req.params._id};
	var film = req.body;
	Film.update(query, film, {}, function(err, film) {
		if (err) return next(err);
		res.json(film);
	})
};

// Remove Film
module.exports.removeFilm = function(req, res, next) {
	var query = {_id: req.params._id};
	Film.remove(query, function(err, film) {
		if (err) return next(err);
		res.json(film);
	})
};
