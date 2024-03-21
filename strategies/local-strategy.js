const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcryptjs');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id);
		if (!user) {
			throw new Error("User not found: couldn't deserialize");
		}
		done(null, user);
	} catch (e) {
		done(e, null);
	}
});

exports.localStrategy = passport.use(
	new Strategy(async (username, password, done) => {
		try {
			const foundUser = await User.findOne({ userName: username }).exec();
			if (!foundUser) {
				throw new Error('User not found');
			}
			const compareHash = await bcrypt.compare(password, foundUser.password);
			if (!compareHash) {
				throw new Error('Credentials do not match');
			}
			return done(null, foundUser);
		} catch (e) {
			return done(e, null);
		}
	})
);
