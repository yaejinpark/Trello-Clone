var path = require('path'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	jwt = require('jsonwebtoken'),
	bcrypt = require('bcrypt-nodejs');

//models
var User = require('../models/user'),
	Board = require('../models/board');

//Index
exports.index = function (req,res){
	var user = User;
	user.find({})
	.populate('boards')
	.exec(function (error, data) {
		if (data) {
			res.json(data);
		} else if (error) {
			console.error(error.stack);
		}
	})
}

//Show existing user (one user only)
exports.show = function(req, res) {
	User.find({ _id: req.params.id}, function (error, user){
		if (user) {
			res.json(user);
		} else if(error) {
			console.error(error.stack);
		}
	})
}

//Sign Up (Create new account)
exports.create = function (req, res){
	var password = req.body.password,
		salt = bcrypt.genSaltSync(10),
		hash = bcrypt.hashSync(password,salt);

	var user = new User ({
		username: req.body.username,
		email: req.body.email,
		password: hash
	});
	user.save(function (error, data){
		if (data){
			res.json(data);
		} else if (error) {
			console.error(error.stack);
		}
	})
}

//Update User Information (Only password and e-mail)
exports.edit = function (req, res){
	var password = req.body.password,
		salt = bcrypt.genSaltSync(10),
		hash = bcrypt.hashSync(password,salt);

	var query = { _id: req.params.id};
	User.update(query, {
		password: hash, 
		email: req.body.email}, 
		function (error, data){
			User.find({}, function (error, user){
				res.json(user);
			})
		})
}

//Destroy Existing User
exports.destroy = function (req, res){
	var user = new User({ _id: req.params.id});
	user.remove(function (error,data){
		if(data){
			res.json(data);
		} else if (error) {
			console.error(error.stack);
		}
	})
}