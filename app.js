const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const config = require('./config/database');
const users = require('./routes/students');

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

// Set port value
const PORT = 3000;

// Start server
app.listen(PORT);

