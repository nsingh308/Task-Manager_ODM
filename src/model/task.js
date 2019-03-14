const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

var taskSchema = new Schema({
		name:{
			type: 'String',
			required:true
			},
		completed :{
			type:'Boolean',
			default:false
			
		},
		duration:{
			type:'Number',
			validate(value){
				if(value<18){
					throw new Error('Only Adults should be added. Age > 18 allowed.');
				}
			}
		},
		owner:{
			type:mongoose.Schema.Types.ObjectId,
			required:true,
			ref:'User'
			
		}
		
});

var Task = mongoose.model('Task',taskSchema);
	
module.exports ={ Task };