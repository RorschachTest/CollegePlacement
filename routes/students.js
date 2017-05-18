const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

// Connect to database
mongoose.connect(config.student_database);

// On successful connection
mongoose.connection.on('connected', function(){
	console.log('connected to database '+config.database);
});

// On connection failure
mongoose.connection.on('error', function(err){
	console.log('Error in connection: '+err);
});


// Register
router.post('/register', function(req, res){
	let newStudent = new Student({
		name: req.body.name,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password
	});
});


module.exports = router;