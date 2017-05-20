const mongoose = require('mongoose');

// Creating Company Schema
const CompanySchema = mongoose.schema({
	name:{
		type: String,
		required: true
	},
	email:{
		type: String,
		required: true
	}
});

const Company = module.exports = mongoose.model('Company', CompanySchema);