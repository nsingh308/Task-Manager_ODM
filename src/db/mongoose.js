/**
 * http://usejsdoc.org/
 */

const mongoose = require('mongoose');
const dbName = 'task-manager-api';
const dbURL = 'mongodb+srv://nsingh:<password>@clusternodejs-vjvrw.mongodb.net/'+dbName+'?retryWrites=true';



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
