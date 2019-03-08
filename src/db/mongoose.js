/**
 * http://usejsdoc.org/
 */
const dbConfigReader = require('./dbConfigReader.js');
const mongoose = require('mongoose');
const validator = require('validator');
const dbURL = dbConfigReader.loadConfig();



mongoose.connect(dbURL, {useNewUrlParser : true},{useCreateIndex:true});
	
