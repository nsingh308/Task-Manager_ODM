const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
		name:{
			type: 'String',
			required:true
			},
		duration:{
			type:'Number',
			validate(value){
				if(value<18){
					throw new Error('Only Adults should be added. Age > 18 allowed.');
				}
			}
		},
		email:{
			type:'String',
			validate(value){
				if(!validator.isEmail(value)){
					throw new Error('Provide valid email address');
				}
			}
		}
});
const TaskModel = mongoose.model('Task',taskSchema);
	
module.exports = TaskModel;