const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Student = require('../models/student');
const Company = require('../models/company');
const config = require('../config/database');


module.exports.student = function(passport){
	let opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
	opts.secretOrKey = config.secret;
	passport.use(new JwtStrategy(opts, function(jwt_payload, done){
		console.log(jwt_payload);
		Student.getStudentById(jwt_payload._doc._id, function(err, student){
			if(err){
				return done(err, false);
			}
			if(student){
				// console.log('student is logged in:\n' +student);
				return done(null, student);
			}
			else{
				return done(null, false);
			}
		});
	}));
}

module.exports.company = function(passport){
	let opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
	opts.secretOrKey = config.secret;
	passport.use(new JwtStrategy(opts, function(jwt_payload, done){
		Company.getCompanyById(jwt_payload._doc._id, function(err, company){
			if(err){
				return done(err, false);
			}
			if(company){
				return done(null, student);
			}
			else{
				return done(null, false);
			}
		});
	}));
}
