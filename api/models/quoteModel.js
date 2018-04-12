'use strict';

var mongoose = require('mongoose');

// Quote Schema
var quoteSchema = mongoose.Schema({
	id:{
		type: Number,
		required: true
	},
	bookId:{
		type: Number,
		required: false
	},
	bookTitle:{
		type: String,
		required: false
	},
	filmId:{
		type: Number,
		required: false
	},
	filmTitle:{
		type: String,
		required: false
	},
	characterName:{
		type: String,
		required: false
	},
	quoteText:{
		type: String,
		required: false
	},
	userId:{
		type: Number,
		required: true
	}
});

var Quote = module.exports = mongoose.model('Quote', quoteSchema);
