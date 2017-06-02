const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const config = require('./config/database');
const students = require('./routes/students');
const companies = require('./routes/companies');

// Connect to database
mongoose.connect(config.database);
mongoose.Promise = global.Promise;

// On successful connection
mongoose.connection.on('connected', function(){
	console.log('connected to database '+config.database);
});

// On connection failure
mongoose.connection.on('error', function(err){
	console.log('Error in connection: '+err);
});

const app = express();

// CORS middleware
app.use(cors());

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Body-parser middleware
app.use(bodyParser.json());

// Passport Middlware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/student', students);
app.use('/company', companies);

app.get('/', function(req, res){
	res.send('Link to student or company login');
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Set port value
const port = process.env.PORT || 8080;

// Start server
app.listen(port, function(){
	console.log('listening to ' + port);
});
