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
		}
		
});

//MiddleWare , arrow functions don not have binding property, hence here to bind a function to
//middleware save we have to use function normally.
taskSchema.pre('save',async function(next){
	
	console.log('Before Save called for Task');
	next()
	  
});


var Task = mongoose.model('Task',taskSchema);
	
module.exports ={ Task };