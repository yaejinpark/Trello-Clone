// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema for todo
var todoSchema = new Schema({
	_listid: { type: Schema.Types.ObjectId, ref: 'List'}, 
	//This is the equivalent of list_id
	name: String,
	created_at: Date,
	updated_at: Date
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;