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

	Student.addStudent(newStudent, function(err, user){
		if(err){
			res.json({success: false, msg: 'Failed to register student'});
		}
		else{
			res.json({success: true, msg: 'Student has been registered'});
		}
	});
});

// Authenticate

// Login request
router.get('/login', function(req, res){
	render('/student/login');
});

// Signup request
router.get('/signup', function(req, res){
	render('/student/signup');
});

// Dashboard
router.get('/dashboard', function(req, res){
	// render('/dashboard');
});

module.exports = router;
