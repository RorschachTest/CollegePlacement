const mongoose = require('mongoose');

// Creating Student Schema
const StudentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	enrollment_no: {
		type: Number,
		required: true
	},
	email_address: {
		type: String,
		required: true
	},
	cgpa: {
		type: Number,
		required: true
	}
});

const Student = module.exports = mongoose.model('Student', 'StudentSchema');
