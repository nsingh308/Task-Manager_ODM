const mongoose = require('mongoose');
const validator = require('validator');
const passwordValidator = require('password-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pValidation = new passwordValidator();

pValidation.is().min(8).is().max(100).has().uppercase().has().lowercase()
			.has().digits().has().not().spaces();
	
 const Schema = mongoose.Schema;
 
 
const userSchema = new Schema({
		name:{
			type: 'String',
			required:true
			},
		email:{
				type:'String',
				unique: true,
				required:true,
				validate(value){
					if(!validator.isEmail(value)){
						throw new Error('Provide valid email address');
					}
				}
		},
		password:{
			type:'String',
			default:'@Dummy2011',
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
		},
		tokens:[{
			token:{
				type:'String',
				required:true
			}
		}]
});
userSchema.methods.generateAuthToken = async function(){
	const user = this;
	const generatedToken = jwt.sign({_id:user._id.toString()},'thisismysecretKey');
	user.tokens = user.tokens.concat({
		token:generatedToken
	});
	//Save token to database.
	await user.save();
	return generatedToken;
}

userSchema.statics.findByCredentials = async(email, password)=>{
	
	const user = await User.findOne({email});
	if(!user){
		throw new Error('Unable to login');
	}
	const isMatch = await bcrypt.compare(password,user.password);
	if(!isMatch){
		throw new Error('Unable to login');
	}
	return user;
}

//MiddleWare , arrow functions don not have binding property, hence here to bind a function to
// middleware save we have to use function normally.
userSchema.pre('save',async function(next){
	if(this.isModified('password')){
		this.password = await bcrypt.hash(this.password,8);
	}
	next()
	  
});


const User = mongoose.model('User',userSchema);

module.exports ={ User}