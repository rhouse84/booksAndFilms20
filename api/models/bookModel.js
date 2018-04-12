'use strict';

var mongoose = require('mongoose');

// Book Schema
var bookSchema = mongoose.Schema({
	id:{
		type: Number,
		required: true
	},
	authorId:{
		type: Number,
		required: true
	},
	authorName:{
		type: String,
		required: true
	},
	createDate:{
		type: Date,
		required: true
	},
	genre: {
		type: String,
		required: true
	},
	notes:{
		type: String,
		required: false
	},
	rating:{
		type: Number,
		required: true
	},
	readDate:{
		type: Date,
		required: true
	},
	title:{
		type: String,
		required: true
	},
	topicId:{
		type: Number,
		required: false
	},
	topicDesc:{
		type: String,
		required: false
	},
	userId:{
		type: Number,
		required: true
	}
});

var Book = module.exports = mongoose.model('Book', bookSchema);
