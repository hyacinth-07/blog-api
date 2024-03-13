const Post = require('../models/post');
const Comment = require('../models/comment');

exports.home_page = async (req, res, next) => {
	try {
		const allPosts = await Post.find()
			.sort({ date: -1 })
			.populate('comments')
			.exec();
		res.json({
			message: 'Welcome to the API blog',
			post: allPosts,
		});
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};

exports.single_thread = async (req, res, next) => {
	try {
		const post = await Post.findById(req.params.id).populate('comments').exec();

		if (post === null) {
			res.json({ message: 'Thread does not exist' });
		}

		res.json({
			message: 'Single thread page',
			post: post,
		});
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};

exports.post_create = async (req, res, next) => {
	const post = new Post({
		title: req.body.title,
		text: req.body.text,
		hidden: req.body.hidden,
	});

	try {
		const newPost = await post.save();
		res.status(201).json({ message: 'Create new post', newPost });
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
};

exports.post_delete = async (req, res, next) => {
	const toBeDeleted = await Post.findById(req.params.id).exec();
	try {
		if (toBeDeleted === null) {
			res.json({ message: 'Thread does not exist' });
		}

		await toBeDeleted.deleteOne();
		res.json({ message: `Post deleted` });
	} catch (e) {
		res.status(500).json({ message: err.message });
	}
};

exports.post_update = async (req, res, next) => {
	const toBeUpdated = await Post.findById(req.params.id).exec();

	if (req.body.text != null) {
		toBeUpdated.text = req.body.text;
	}

	if (req.body.hidden != null) {
		toBeUpdated.hidden = req.body.hidden;
	}

	toBeUpdated.date = Date.now();

	try {
		const updated = await toBeUpdated.save();
		res.json({ message: 'Update page!', updated });
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
};
