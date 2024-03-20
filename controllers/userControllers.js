const User = require('../models/user');

exports.user_get = async (req, res, next) => {
	try {
		const allUsers = await User.find();
		res.json({
			message: 'A list of users',
			allUsers: allUsers,
		});
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};

exports.user_create = async (req, res, next) => {
	try {
		const newUser = new User({
			userName: req.body.userName,
			password: req.body.password,
		});
		const result = await newUser.save();
		const allUsers = await User.find();
		res.json(allUsers);
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
};
