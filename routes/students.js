const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config/database');
const Student = require('../models/student');
const Job = require('../models/job');

// Register
router.post('/register', function(req, res){
	let newStudent = new Student({
		name : req.body.name,
		enrollment_no: req.body.enrollment_no,
		cgpa: req.body.cgpa,
		email_address: req.body.email_address,
		password: req.body.password
	});

	console.log(newStudent);

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
						user_type: student.user_type
					}
				});
			}
			else{
				return res.json({success: false, msg: 'Wrong password'});
			}
		});
	});
});

// Get all jobs info request
router.get('/jobs', function(req, res){
	Job.getAllJobs(function(err, data){
		if(err){
			res.json({success: false, jobs: null});
		}
		else{
			res.json({success: true, jobs: data});
		}
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
router.get('/dashboard', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), function(req, res){
	// render('/dashboard');
	res.json({student: req.user});
});

// Profile Update
// router.post('/update', function(req, res){
//
// });

// Get ProfileInfo
router.post('/profile', function(req, res){
	Student.getStudentById(req.body._id, function(err, student){
		if(err){
			res.json({success: false, student: null});
		}
		else{
			res.json({success: true, student: student});
		}
	});
});

// Apply for job
router.post('/apply', function(req, res){
	console.log('job application received');
	const job_id = req.body.job_id;
	const student_id = req.body.student_id;
	Student.applyForJob(job_id, student_id, function(err, student){
		if(err){
			res.json({success: false});
		}
		else{
			console.log('Student post successful');
			Job.studentApplied(job_id, student_id, function(err, student){
				if(err){
					res.json({success: false});
				}
				else res.json({success: true});
			});
		}
	});
});

module.exports = router;
