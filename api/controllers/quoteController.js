'use strict';

var mongoose = require('mongoose');
var Quote = mongoose.model('Quote');

// Get Quotes
module.exports.getQuotes = function(req, res, next) {
	Quote.find({}, function(err, quotes) {
		if (err) return next(err);
		res.json(quotes);
	});
};

// Get Quotes by bookId
module.exports.getQuotesByBook = function(req, res, next) {
	var bookId = req.params._bookId;
	Quote.find({bookId:bookId}, function(err, quotes) {
		if (err) return next(err);
		res.json(quotes);
	});
};

// Get Quotes by filmId
module.exports.getQuotesByFilm = function(req, res, next) {
	var filmId = req.params._filmId;
	Quote.find({filmId:filmId}, function(err, quotes) {
		if (err) return next(err);
		res.json(quotes);
	});
};

// Get Single Quote
module.exports.getQuote = function(req, res, next) {
	var id = req.params._id;
	Quote.findById(id, function(err, quote) {
		if (err) return next(err);
		res.json(quote);
	})
};

// Add Quote
module.exports.addQuote = function(req, res, next) {
	var quote = req.body;
	Quote.create(quote, function(err, quote) {
		if (err) return next(err);
		res.json(quote);
	})
};

// Update Quote
module.exports.updateQuote = function(req, res, next) {
	var id = req.params._id;
	var quote = req.body;
	Quote.findOneAndUpdate(id, quote, {}, function(err, quote) {
		if (err) return next(err);
		res.json(quote);
	})
};

// Remove Quote
module.exports.removeQuote = function(req, res, next) {
	var query = {_id: req.params._id};
	Quote.remove(query, function(err, quote) {
		if (err) return next(err);
		res.json(quote);
	})
};
