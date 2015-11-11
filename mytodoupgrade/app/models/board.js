// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var List = require('./list');

//create a schema for board
var boardSchema = new Schema({
	name: { type: String, required: true, unique: true},
	lists: [{ type: Schema.Types.ObjectId, ref:'List'}],
	created_at: Date,
	updated_at: Date
});

var Board = mongoose.model('Board', boardSchema);

module.exports = Board;