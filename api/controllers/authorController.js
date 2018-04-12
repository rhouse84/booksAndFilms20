'use strict';

var mongoose = require('mongoose');
var Author = mongoose.model('Author');

// Get Authors
module.exports.getAuthors = function(req, res) {
	Author.find({}, function(err, authors) {
		if (err) {
			throw err;
		}
		res.json(authors);
	});
};

// Get Single Author
module.exports.getAuthor = function(req, res) {
	var id = req.params._id;
	Author.findById(id, function(err, author) {
		if (err) {
			throw err;
		}
		res.json(author);
	})
};

// Add Author
module.exports.addAuthor = function(req, res) {
	var author = req.body;
	Author.create(author, function(err, author) {
		if (err) {
			throw err;
		}
		res.json(author);
	})
};

// Update Author
module.exports.updateAuthor = function(req, res) {
	var id = req.params._id;
	var author = req.body;
	Author.findOneAndUpdate(id, author, {}, function(err, author) {
		if (err) {
			throw err;
		}
		res.json(author);
	})
};

// Remove Author
module.exports.removeAuthor = function(req, res) {
	var query = {_id: req.params._id};
	Author.remove(query, function(err, author) {
		if (err) {
			throw err;
		}
		res.json(author);
	})
};
