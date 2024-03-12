const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	title: {
		type: String,
		required: true,
		minLength: 1,
		maxLength: 200,
	},
	text: {
		type: String,
		minLength: 1,
	},
	hidden: {
		type: Boolean,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	comments: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Comment',
		},
	],
});

PostSchema.virtual('url').get(function () {
	return `/post/${this._id}`;
});

modules.exports = mongoose.model('Post', PostSchema);
