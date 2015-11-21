var path = require('path'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');

//models
var Board = require('../models/board'),
	User = require('../models/user');

//Index
exports.index = function (req,res){
	var userId = req.user._id;
	var board = Board;
	board.find({_userid: userId})
	.populate('lists')
	.exec(function (error, data) {
		if (data) {
			res.json(data);
		} else if (error) {
			console.error(error.stack);
		}
	})
}

//Show Existing Board
exports.show = function (req, res){
	Board.find({_id: req.params.board_id}, function (error,data){
		if (data) {
			res.json(data)
		} else if (error){
			console.error(error.stack);
		}
	})
}

//Create New Board
exports.create = function(req,res){
	var userId = req.user._id;
	var board = new Board ({name: req.body.name, _userid: userId});
	board.save(function (error,data) {
		if (data) {
			User.findOne({_id: userId}, function (err, user){
				if (err) {
					console.log(err);
				} else {
					var id = mongoose.Types.ObjectId(board._id);
					user.boards.push(id)
					user.save()
					res.json(data);	
				}
			})
		} else if (error) {
			console.error(error.stack);
		}
	})
}

//Update Existing board
exports.edit = function (req,res){
	var query = { _id: req.params.board_id};
	Board.update(query, {name: req.body.name}, function (error,data){
		Board.find({}, function (error, board) {
			res.json(board);
		})
	})
}

//Destroy Existing board
exports.destroy = function (req,res){
	var board = new Board({_id: req.params.board_id});
	board.remove(function (error,data) {
		if (data) {
			res.json(data);
		} else if(error) {
			console.error(error.stack);
		}
	})
}
