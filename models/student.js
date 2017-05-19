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
	}
	// jobs:{
	// 	type: [mongoose.Schema.Types.ObjectId],
	// 	required: false;
	// }
});

const Student = module.exports = mongoose.model('Student', StudentSchema);

module.exports.addStudent = function(newStudent, callback){
	bcrypt.genSalt(10, function(err, salt){
		if(err) throw err;
		bcrypt.hash(newStudent.password, salt, function(err, hash){
			if(err) throw err;
			newStudent.password = hash;
			newStudent.save(callback);
		});
	});
}
