const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Creating Student Schema
const StudentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	enrollment_no: {
		type: Number,
		required: true,
		unique: true,
		index: true
	},
	cgpa: {
		type: Number,
		required: true
	},
	email_address: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	jobs_applied:{
		type: [mongoose.Schema.Types.ObjectId],
		required: false
	}
});

const Student = module.exports = mongoose.model('Student', StudentSchema);

module.exports.getStudentById = function(id, callback){
	Student.findById(id, callback);
}

module.exports.getStudentByEnrollment_no = function(enrollment_no, callback){
	const query = {enrollment_no: enrollment_no};
	Student.findOne(query, callback);
}

module.exports.addStudent = function(newStudent, callback){
	bcrypt.genSalt(10, function(err, salt){
		bcrypt.hash(newStudent.password, salt, function(err, hash){
			if(err) throw err;
			newStudent.password = hash;
			newStudent.save(callback);
		});
	});
}

module.exports.comparePassword = function(candidatePassword, hash, callback){

	bcrypt.compare(candidatePassword, hash, function(err, isMatch){
		// console.log((isMatch? 'in compare match': 'in compare password no match'));
		try{
			callback(null, isMatch);
		}catch(err){
			console.log('login failed');
			throw err;
		}
	});
}
