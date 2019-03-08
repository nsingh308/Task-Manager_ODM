/**
 * http://usejsdoc.org/
 */
const dbConfigReader = require('./dbConfigReader.js');
const mongoose = require('mongoose');
const validator = require('validator');
const dbURL = dbConfigReader.loadConfig();

//var TaskModel = require('../model/task.js');
const UserModel = require('../model/user.js');

	mongoose.connect(dbURL, {useNewUrlParser : true},{useCreateIndex:true});
	
	//const learnNode = new TaskModel.Task({name:'Learning1 next step',duration:19,email:'navdeep.singh1@gmail.com'});
	
	const user = new UserModel.User({
		"user": "Minu",
		"password": "@xyZBim2012"
	});
	
	user.save().then(()=>{
		console.log('Successfully Saved Task.');
	}).catch((error)=>{
		console.log('Error saving task. '+error);
	})
	
	

