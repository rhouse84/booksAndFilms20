'use strict';

var mongoose = require('mongoose');
var Book = mongoose.model('Book');

// Get Books
module.exports.getBooks = function(req, res) {
	Book.find({}, function(err, books) {
		if (err) {
			throw err;
		}
		res.json(books);
	});
};

// Get Books by Author
module.exports.getBooksByAuthor = function(req, res) {
	var authorId = req.params._authorId;
	Book.find({authorId:authorId}, function(err, books) {
		if (err) {
			throw err;
		}
		res.json(books);
	});
};

// Get Single Book
module.exports.getBook = function(req, res) {
	var id = req.params._id;
	Book.findById(id, function(err, book) {
		if (err) {
			throw err;
		}
		res.json(book);
	})
};

// Add Book
module.exports.addBook = function(req, res) {
	var book = req.body;
	Book.create(book, function(err, book) {
		if (err) {
			throw err;
		}
		res.json(book);
	})
};

// Update Book
module.exports.updateBook = function(req, res) {
	var id = req.params._id;
	var book = req.body;
	Book.findOneAndUpdate(id, book, {}, function(err, book) {
		if (err) {
			throw err;
		}
		res.json(book);
	})
};

// Remove Book
module.exports.removeBook = function(req, res) {
	var query = {_id: req.params._id};
	Book.remove(query, function(err, book) {
		if (err) {
			throw err;
		}
		res.json(book);
	})
};
