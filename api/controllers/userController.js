'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');

// Get Users
module.exports.getUsers = function(req, res, next) {
	User.find({}, function(err, users) {
		if (err) return next(err);
		res.json(users);
	});
};

// Get User by email
module.exports.getUserByEmail = function(req, res, next) {
	var email = req.params._email;
	User.find({email:email}, function(err, user) {
		if (err) return next(err);
		res.json(user);
	});
};

// Get Single User
module.exports.getUser = function(req, res, next) {
	var id = req.params._id;
	User.findById(id, function(err, user) {
		if (err) return next(err);
		res.json(user);
	})
};

// Add User
module.exports.addUser = function(req, res, next) {
	var user = req.body;
	User.create(user, function(err, user) {
		if (err) return next(err);
		res.json(user);
	})
};

// Update User
module.exports.updateUser = function(req, res, next) {
	var id = req.params._id;
	var user = req.body;
	User.findOneAndUpdate(id, user, {}, function(err, user) {
		if (err) return next(err);
		res.json(user);
	})
};

// Remove User
module.exports.removeUser = function(req, res, next) {
	var query = {_id: req.params._id};
	User.remove(query, function(err, user) {
		if (err) return next(err);
		res.json(user);
	})
};
