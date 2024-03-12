const Post = require('../models/post');
const Comment = require('../models/comment');

exports.home_page = async (req, res, next) => {
	try {
		const allPosts = await Post.find();
		res.json({ message: 'Welcome to the API blog', post: allPosts });
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};
