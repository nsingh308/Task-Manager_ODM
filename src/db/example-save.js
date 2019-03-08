/**
 * http://usejsdoc.org/
 */
const dbConfigReader = require('./dbConfigReader.js');
const mongoose = require('mongoose');
const validator = require('validator');
const dbURL = dbConfigReader.loadConfig();

const TaskModel = require('../model/task.js');

	mongoose.connect(dbURL, {useNewUrlParser : true},{useCreateIndex:true});
	
	const learnNode = new TaskModel.Task({name:'Learning1 next step',duration:19,email:'navdeep.singh1@gmail.com'});
	
	
	learnNode.save().then(()=>{
		console.log('Successfully Saved Task.');
	}).catch((error)=>{
		console.log('Error saving task. '+error);
	})
	
	

