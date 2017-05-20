const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config/database');
const Student = require('../models/student');

// Register
router.post('/register', function(req, res){
	let newStudent = new Student({
		name : req.body.name,
		enrollment_no: req.body.enrollment_no,
		cgpa: req.body.cgpa,
		email_address: req.body.email_address,
		password: req.body.password
	});

	Student.addStudent(newStudent, function(err, student){
		if(err){
			// console.log('Error mesg: '+err);
			res.json({success: false, msg: 'Failed to register student'});
		}
		else{
			res.json({success: true, msg: 'Student has been registered'});
		}
	});
});

// Authenticate
router.post('/authenticate', function(req, res){
	const enrollment_no = req.body.enrollment_no;
	const password = req.body.password;

	Student.getStudentByEnrollment_no(enrollment_no, function(err, student){
		if(err) throw err;
		if(!student){
			return res.json({success: false, msg: 'Student not found'});
		}

		// console.log(student);

		Student.comparePassword(password, student.password, function(err, isMatch){
			if(err) throw err;
			if(isMatch){
				const studentToken = jwt.sign(student, config.secret, {
					expiresIn: 604800 //1 week
				});

				res.json({
					success: true,
					jwt: 'JWT '+studentToken,
					student: {
						id: student._id,
						name: student.name,
						enrollment_no: student.enrollment_no,
						email: student.email_address
					}
				});
			}
			else{
				return res.json({success: false, msg: 'Wrong password'});
			}
		});
	});
});


// Login request
router.get('/login', function(req, res){
	render('/student/login');
});

// Signup request
router.get('/signup', function(req, res){
	render('/student/signup');
});

// Dashboard
router.get('/dashboard', passport.authenticate('jwt', {session: false}), function(req, res){
	// render('/dashboard');
	// console.log('student is res ' + req);
	res.json({student: req.user});
});

module.exports = router;
