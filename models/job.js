const mongoose = require('mongoose');

// Creating Schema for the job position
const JobSchema = mongoose.Schema({
	company_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	location: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	expected_CTC: {
		type: Number,
		required: true
	},
	students_applied: {
		type: [mongoose.Schema.Types.ObjectId],
		required: false
	}
});

const Job = module.exports = mongoose.model('Job', JobSchema);

module.exports.getJobById = function(job_id, callback){
	Job.findById(job_id, callback);
}

module.exports.addJob = function(newJob, callback){
	try{
		newJob.save(callback);
	} catch(ex){
		console.error(ex);
	}
}

module.exports.studentApplied = function(job_id, student_id, callback){
	Job.findByIdAndUpdate(job_id,
		{$push: {"students_applied": student_id}},
		{safe: true, upsert: false, new: true},
		callback
	);
}

module.exports.getAllJobs = function(callback){
	Job.find({}, callback);
}
