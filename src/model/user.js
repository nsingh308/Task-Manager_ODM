const mongoose = require('mongoose');
const validator = require('validator');
const passwordValidator = require('password-validator');
const pValidation = new passwordValidator();

pValidation.is().min(8).is().max(100).has().uppercase().has().lowercase()
			.has().digits().has().not().spaces();
	
 const Schema = mongoose.Schema;
 
 
const userSchema = new Schema({
		user:{
			type: 'String',
			required:true
			},
		email:{
				type:'String',
				required:true,
				validate(value){
					if(!validator.isEmail(value)){
						throw new Error('Provide valid email address');
					}
				}
		},
		password:{
			type:'String',
			default:'@Hoom2012',
			validate(value){
				if(!pValidation.validate(value)){
					throw new Error('\nPassword not upto mark.'+ 
							'\nPlease reenter. Rules are: '+
					'\nMinimum length 8 '+
					'\nMaximum length 100 '+
					'\nMust have uppercase letters '+
					'\nMust have lowercase letters '+
					'\nMust have digits '+
					'\nShould not have spaces '
					);
				}
			}
		}
});

const User = mongoose.model('User',userSchema);

module.exports ={ User}