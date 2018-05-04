'use strict';

var mongoose = require('mongoose');
var Author = mongoose.model('Author');

// Get Authors
module.exports.getAuthors = function(req, res, next) {
	Author.find({}, function(err, authors) {
		if (err) return next(err);
		res.json(authors);
	});
};

// Search Authors
module.exports.searchAuthors = function(req, res, next) {
	var search = req.params._search;
	var regx = new RegExp(search, 'gi');
	Author.find({ name: { $regex: regx } }, function(err, authors) {
		if (err) return next(err);
		res.json(authors);
	});
};

// Get Single Author
module.exports.getAuthor = function(req, res, next) {
	var id = req.params._id;
	Author.findById(id, function(err, author) {
		if (err) return next(err);
		res.json(author);
	})
};

// Add Author
module.exports.addAuthor = function(req, res, next) {
	var author = req.body;
	Author.create(author, function(err, author) {
		if (err) return next(err);
		res.json(author);
	})
};

// Update Author
module.exports.updateAuthor = function(req, res, next) {
	var query = {_id: req.params._id};
	var author = req.body;
	Author.update(query, author, {}, function(err, author) {
		if (err) return next(err);
		res.json(author);
	})
};

// Remove Author
module.exports.removeAuthor = function(req, res, next) {
	var query = {_id: req.params._id};
	Author.remove(query, function(err, author) {
		if (err) return next(err);
		res.json(author);
	})
};
