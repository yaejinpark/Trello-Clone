var jwt = require('jsonwebtoken'),
	express = require('express'),
	app = express();

exports.auth = function (req,res,next) {
	//check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	//decode token
	if(token) {
		// verifies secret and checks exp
		jwt.verify(token, app.get('superSecret'), function (err, decoded) {
			if (err) {
				return res.status(422).json({
					success: false,
					message: 'Failed to authenticate token.'
				})
			} else {
				// if everything is good, save to request for use in other routes				
				req.decoded = decoded;
				next();
			}
		});
	} else {
		//return an error
		return res.status(403).send({
			success: false,
			message: 'No token provided.'
		});
	}
};