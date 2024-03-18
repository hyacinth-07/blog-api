const Post = require('../models/post');
const Comment = require('../models/comment');

exports.single_comment = async (req, res, next) => {
	const comment = await Comment.findById(req.params.commentId)
		.populate({ path: 'postAttached', select: 'title', postId: '_id' })
		.exec();

	if (comment === null) {
		res.json({ message: 'Comment does not exist' });
	}

	try {
		res.json({
			message: 'Single comment page',
			comment: comment,
		});
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};

exports.comment_delete = async (req, res, next) => {
	const toBeDeleted = await Comment.findById(req.params.id).exec();
	if (toBeDeleted === null) {
		res.json({ message: 'Comment does not exist' });
	}
	try {
		await toBeDeleted.deleteOne();
		res.json({ message: `Comment deleted` });
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};

exports.comment_add = async (req, res, next) => {
	const post = await Post.findById(req.params.id).populate('comments').exec();

	const comment = new Comment({
		name: req.body.name,
		text: req.body.text,
		postAttached: post._id,
	});

	try {
		post.comments.push(comment);
		const newComment = comment.save();
		const updatedPost = post.save();
		res.status(201).json({ post });
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};
