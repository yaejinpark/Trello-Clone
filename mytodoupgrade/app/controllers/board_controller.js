var path = require('path'),
	bodyParser = require('body-parser');

//models
var Board = require('../models/board')

//Index
exports.index = function (req,res){
	var userId = req.param('userId')
	var board = Board;
	board.find({_userid: userId}, function (error, data){
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
	var board = new Board ({name: req.body.name, _userid: req.body._userid});
	board.save(function (error,data) {
		if (data) {
			res.json(data);
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
