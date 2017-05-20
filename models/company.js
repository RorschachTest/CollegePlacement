const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

// Creating Company Schema
const CompanySchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		index: true
	},
	password: {
		type: String,
		required: true
	},
	job_posted: {
		type: [mongoose.Schema.Types.ObjectId],
		required: false
	}
});

const Company = module.exports = mongoose.model('Company', CompanySchema);

module.exports.addCompany = function(newCompany, callback){
	bcrypt.genSalt(10, function(err, salt){
		bcrypt.hash(newCompany.password, salt, function(err, hash){
			if(err) throw err;
			newCompany.password = hash;
			newCompany.save(callback);
		});
	});
}
