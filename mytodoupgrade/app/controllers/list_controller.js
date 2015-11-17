var path = require('path'),
	bodyParser = require('body-parser');

//models (this already fetches mongoose through model, no need to call it again)
var List = require('../models/list');

//Index
exports.index = function (req,res){
	var boardId = req.param('boardId')
	var list = List;
	// list.find({_boardid: boardId})
	// .populate('todos')
	// .exec(function (error, data) {
	// 	if (data) {
	// 		res.json(data);
	// 	} else if (error) {
	// 		console.error(error.stack);
	// 	}
	// })
	list.find({_boardid: boardId}, function (error, data){
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
			res.json(data);
		} else if (error) {
			console.error(error.stack);
		}
	.populate('todos')
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