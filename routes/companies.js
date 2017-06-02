const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config/database');
const Company = require('../models/company');
const Job = require('../models/job');
const Student = require('../models/student');

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
						user_type: company.user_type
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

router.post('/postedjobs', function(req, res){

	Company.getCompanyById(req.body._id, function(err, company){
		if(err){
			res.json({success: false, jobs: null});
		}
		else{
			try{
				const result = [];
				company.job_posted.forEach(function(job_id){
					Job.getJobById(job_id, function(err, job){
						if(err){
							throw(err);
						} else{
							result.push({
								_id: job._id,
								title: job.title,
								location: job.location,
								description: job.description,
								expected_CTC: job.expected_CTC,
							});
							if(result.length === company.job_posted.length){
								res.json({success: true, jobs: result});
							}
						}
						// console.log(jobs);
					});
				});
				//problem with the scope of jobs -no problem was with sync
			}
			catch(err){
				res.json({success: false, jobs: []});
			}
		}
	});
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

// Show student applied in a company
router.post('/showjobs', function(req, res){
	console.log('showing jobs');
	let job_id = req.body._id;
	Job.getJobById(job_id, function(err, job){
		if(err){
			res.json({success: false, students: null});
		}
		else{
			try{
					const result = [];
					job.students_applied.forEach(function(student_id){
						Student.getStudentById(student_id, function(err, student){
							if(err){
								throw (err);
							} else{
								result.push({
									name: student.name,
									cgpa: student.cgpa,
									email_address: student.email_address
								});
								if(result.length === job.students_applied.length){
									res.json({success: true, students: result});
								}
							}
							// console.log(jobs);
						});
					});
			} catch(err){
				res.json({success: false, students: null});
			}
		}
	});
});





module.exports = router;
