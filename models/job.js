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

module.exports.addJob = function(newJob, callback){
	try{
		newJob.save(callback);
	} catch(ex){
		console.error(ex);
	}
}
