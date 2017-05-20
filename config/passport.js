const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Student = require('../models/student');
const config = require('../config/database');

module.exports = function(passport){
	let opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
	opts.secretOrKey = config.secret;
	passport.use(new JwtStrategy(opts, function(jwt_payload, done){
		console.log(jwt_payload);
		User.getUserById(jwt_payload._doc._id, function(err, student){
			if(err){
				return done(err, false);
			}
			if(student){
				return done(null, student);
			}
			else{
				return done(null, false);
			}
		});
	})); 
}
