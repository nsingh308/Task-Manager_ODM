/**
 * http://usejsdoc.org/
 */
const dbConfigReader = require('./dbConfigReader.js');
const mongoose = require('mongoose');
const dbURL = dbConfigReader.loadConfig();


	mongoose.connect(dbURL, {useNewUrlParser : true},{useCreateIndex:true});
	const Task = mongoose.model('Task',{
			name:{
				type: 'String',
				required:true
				},
			duration:{
				type:'Number'
			}
			}
		);
	
	const learnNode = new Task({name:'Learn Node Js MongoDB'});
	
	learnNode.save().then(()=>{
		console.log('Successfully Saved Task');
	}).catch((error)=>{
		console.log('Error saving task'+error);
	})
