var path = require('path'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');

//models (this already fetches mongoose through model, no need to call it again)
var List = require('../models/list'),
	Board = require('../models/board');

//Index
exports.index = function (req,res){
	var boardId = req.param('boardId')
	var list = List;
	list.find({_boardid: boardId})
	.populate('todos')
	.exec(function (error, data) {
		if (data) {
			res.json(data);
		} else if (error) {
			console.error(error.stack);
		}
	})
}

//Show Existing List
exports.show = function (req, res){
	List.find({_id: req.params.list_id}, function (error,data){
		if (data) {
			res.json(data)
		} else if (error){
			console.error(error.stack);
		}
	})
}

//Create New List
exports.create = function(req,res){
	var boardId = req.body._boardid;
	var list = new List ({name: req.body.name, _boardid: req.body._boardid});
	list.save(function (error,data) {
		if (data) {
			Board.findOne({_id: boardId}, function (err, board){
				var id = mongoose.Types.ObjectId(list._id);
				board.lists.push(id)
				board.save()
				res.json(data);
			})
		} else if (error) {
			console.error(error.stack);
		}
	})
}

//Update Existing List
exports.edit = function (req,res){
	var query = { _id: req.params.list_id};
	List.update(query, {name: req.body.name}, function (error,data){
		List.find({}, function (error, list) {
			res.json(list);
		})
	})
}

//Destroy Existing List
exports.destroy = function (req,res){
	var list = new List({_id: req.params.list_id});
	list.remove(function (error,data) {
		if (data) {
			res.json(data.populate('todos'));
		} else if(error) {
			console.error(error.stack);
		}
	})
}