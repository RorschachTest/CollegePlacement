const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config/database');
const Company = require('../models/company');

// Register
router.post('/register', function(req, res){
	let newCompany = new Company({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	});

	Company.addCompany(newCompany, function(err, company){
		if(err){
			res.json({success: false, msg: 'Error in registration'});
		}
		else{
			res.json({success: true, msg: 'Your company as been registered for this placement session'});
		}
	});
});

module.exports = router;