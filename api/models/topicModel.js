'use strict';

var mongoose = require('mongoose');

// Topic Schema
var topicSchema = mongoose.Schema({
	id:{
		type: Number,
		required: true
	},
	description:{
		type: String,
		required: true
	},
	userId:{
		type: Number,
		required: true
	}
});

var Topic = module.exports = mongoose.model('Topic', topicSchema);
