/**
 * http://usejsdoc.org/
 * 
 * This is express middle ware function
 */
const jwt = require('jsonwebtoken');
const UserModel = require('../model/user.js');




/**
 * validate login auth tokens
 */
const auth = async(req,res,next)=>{
	
	try{
		const token = req.header("Authorization").replace('Bearer ','');
		
		//console.log(token);
		const decoded = jwt.verify(token,'thisismysecretKey');
		const user = await UserModel.User.findOne({_id:decoded._id,'tokens.token':token});
		if(!user){
			throw new Error();
		}
		req.user = user;
		next();
	}catch(e){
		console.log(e);
		res.status(401).send('{error:"Please authenticate"}')
	}
}

module.exports= auth;