// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Board = require('./board');

var userSchema = new Schema({
	username: { type: String, required: true, unique: true},
	email: { type: String, required: true, unique: true},
	password: { type: String, required: true},
	boards: [{ type: Schema.Types.ObjectId, ref:'Board'}],
	created_at: Date,
	updated_at: Date
});

var User = mongoose.model('User', userSchema);

module.exports = User;