var path = require('path'),
	bodyParser = require('body-parser');

//models
var User = require('../models/user')

//Index
exports.index = function (req,res){
	var user = User;
	user.find({}, function (error, data){
		if (data) {
			res.json(data)
		} else if (error) {
			console.error(error.stack);
		}
	})
}

//Sign Up (Create new account)
exports.create = function (req, res){
	var user = new User ({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	});

	user.save(function (error, data){
		if (data){
			User.find({}, function (error, users){
				res.json(users);
			})
		} else if (error) {
			console.error(error.stack);
		}
	})
}