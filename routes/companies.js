const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config/database');
const Company = require('../models/company');
const Job = require('../models/job');

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

// Authenticate
router.post('/authenticate', function(req, res){
	const email = req.body.email;
	const password = req.body.password;

	Company.getCompanyByEmail(email, function(err, company){
		if(err) throw err;
		if(!company){
			return res.json({success: false, msg: 'No company found'});
		}

		Company.comparePassword(password, company.password, function(err, isMatch){
			if(err) throw err;
			if(isMatch){
				const companyToken = jwt.sign(company, config.secret, {
					expiresIn: 604800 //1 week
				});

				res.json({
					success: true,
					jwt: 'JWT '+companyToken,
					company: {
						id: company._id,
						name: company.name,
						enrollment_no: company.enrollment_no,
						email: company.email_address
					}
				});
			}
			else{
				res.json({success: false, msg: 'wrong password'});
			}
		});
	});
});

// Dasboard get request
router.get('/dashboard', passport.authenticate('jwt', {session: false}), function(req, res){
	// render('/dashboard');
	res.json({company: req.user});
});

// Post job by a company
router.post('/jobs', function(req, res){
	let newJob = new Job({
		company_id: req.body.company_id,
		title: req.body.title,
		location: req.body.location,
		description: req.body.description,
		expected_CTC: req.body.expected_CTC
	});

	Job.addJob(newJob, function(err, job){
		if(err){
			res.json({success: false, msg: 'Error in job posting'});
		}
		else{
			res.json({success: true, msg: 'New job has been posted'});
			Company.addedByCompany(newJob.company_id, job._id);
		}
	});

});

module.exports = router;
