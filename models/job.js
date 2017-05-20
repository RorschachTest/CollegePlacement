const mongoose = require('mongoose');

// Creating Schema for the job position
const JobSchema = mongoose.Schema({
	name: String,
	location: String //city
});

const Job = module.exports = mongoose.model('Job', JobSchema);
