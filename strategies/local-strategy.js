const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const User = require('../models/user');

exports.localStrategy = passport.use(
	new Strategy(async (userName, password, done) => {
		console.log(`Username: ${userName}`);
		console.log(`Password: ${password}`);
		try {
			const foundUser = await User.findOne({ userName: userName });
			if (!foundUser) {
				return done(null, false, { message: 'foundUsername does not exist' });
			}
			if (foundUser.password !== password) {
				return done(null, false, { message: 'Password is incorrect' });
			}
			return done(null, foundUser);
		} catch (e) {
			return done(e, null);
		}
	})
);
