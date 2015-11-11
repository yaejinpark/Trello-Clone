// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Todo = require('./todo');
var Board = require('./board');

//create a schema for list
var listSchema = new Schema({
	_boardid: { type: Schema.Types.ObjectId, ref: 'Board'},
	name: { type: String, required: true, unique: true},
	todos: [{ type: Schema.Types.ObjectId, ref:'Todo'}],
	created_at: Date,
	updated_at: Date
});

var List = mongoose.model('List', listSchema);

module.exports = List;