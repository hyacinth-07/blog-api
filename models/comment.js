const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	name: {
		type: String,
		required: true,
		minLength: 2,
		maxLength: 50,
	},
	text: {
		type: String,
		minLength: 1,
		maxLength: 350,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	postAttached: {
		type: Schema.Types.ObjectId,
		ref: 'Post',
		required: true,
	},
});

// add a virtual url like
// post/${postAttached._id}/${this._id}

module.exports = mongoose.model('Comment', CommentSchema);
