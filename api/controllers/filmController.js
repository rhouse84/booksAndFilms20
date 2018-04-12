'use strict';

var mongoose = require('mongoose');
var Film = mongoose.model('Film');

// Get Films
module.exports.getFilms = function(req, res) {
	Film.find({}, function(err, films) {
		if (err) {
			throw err;
		}
		res.json(films);
	});
};

// Get Films by Director
module.exports.getFilmsByDirector = function(req, res) {
	var directorId = req.params._directorId;
	Film.find({directorId:directorId}, function(err, films) {
		if (err) {
			throw err;
		}
		res.json(films);
	});
};

// Get Single Film
module.exports.getFilm = function(req, res) {
	var id = req.params._id;
	Film.findById(id, function(err, film) {
		if (err) {
			throw err;
		}
		res.json(film);
	})
};

// Add Film
module.exports.addFilm = function(req, res) {
	var film = req.body;
	Film.create(film, function(err, film) {
		if (err) {
			throw err;
		}
		res.json(film);
	})
};

// Update Film
module.exports.updateFilm = function(req, res) {
	var id = req.params._id;
	var film = req.body;
	Film.findOneAndUpdate(id, film, {}, function(err, film) {
		if (err) {
			throw err;
		}
		res.json(film);
	})
};

// Remove Film
module.exports.removeFilm = function(req, res) {
	var query = {_id: req.params._id};
	Film.remove(query, function(err, film) {
		if (err) {
			throw err;
		}
		res.json(film);
	})
};
