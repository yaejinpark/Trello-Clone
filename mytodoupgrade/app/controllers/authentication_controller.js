var app = require('../../app'),
	User = require('../models/user'),
	jwt = require('jsonwebtoken');

exports.auth = function (req, res){
	console.log(app.app.get('superSecret'));
	// find the user
	User.findOne({username: req.body.username}, function (err, user) {

		if (err) throw err;

		if (!user) {
			res.status(404).json({ success: false, message: 'Authentication failed. User not found.' });
		} else if (user) {

			// check if password matches
			if (user.password != req.body.password) {
				res.status(401).json({ success: false, message: 'Authentication failed. Wrong password.' });
			} else {
			    // if user is found and password is right
			    // create a token
			    var token = jwt.sign(user, app.app.settings.superSecret, {
			    	expiresInMinutes: 1440 // expires in 24 hours
			    });

			    // return the information including token as JSON
			    res.json({
			    	success: true,
			    	message: 'Enjoy your token!',
			    	token: token
			    });
			}   

		}

	});
}