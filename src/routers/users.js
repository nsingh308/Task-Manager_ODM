/**
 * http://usejsdoc.org/
 */


const express = require('express');
const UserModel = require('../model/user.js');
const router = new express.Router();

router.post('/users/login',async(req,res)=>{
	
	try{
		//calling our own static defined method.
	 const user = await UserModel.User.findByCredentials(req.body.email,req.body.password);
	 console.log(user);
	 const token = await user.generateAuthToken();
	 
	 res.send({user,token});
	}catch(e){
		res.status(400).send(e);
	}
})

router.post('/users',async(req,res)=>{
	const user = new UserModel.User(req.body);
	try{
	  await user.save();
	  const token = await user.generateAuthToken();
	 res.status(201).send({user,token});
	}catch(e){
		res.status(400).send(e);
	}
})


router.get('/users',async(req, res)=>{
	try{
		const users = await(UserModel.User.find({}));
		res.send(users);
	}catch(error){
		res.status(500).send(error);
	}
})

router.get('/users/:id',async(req, res)=>{
	const _id = req.params.id;
	
	try{
	
		const user = await(UserModel.User.findById(_id));
		if(!user){
			return res.status(404).send();
		}
		res.send(user);
	}catch(error){
		res.status(500).send(error);
	}
})

router.patch('/users/:id', async(req, res)=>{
	const allowedUpdates = ['name','email','password'];
	const updates = Object.keys(req.body);
	
	const isValidOperation = updates.every((key)=>{
		return allowedUpdates.includes(key);
	});
	if(!isValidOperation){
		return res.status(400).send('{"error": "Invalid Updates"}');
	}
	try{
		
		const user = await UserModel.User.findById(req.params.id);
		updates.forEach((update)=>{
			user[update] = req.body[update];
		})
		
		await user.save();
		
		//Below call is a direct call with mongodb method. its by passing mongoose middleware.
		//const user = await (UserModel.User.findByIdAndUpdate(req.params.id,req.body,{ new:true, runValidators:true }));
		
		if(!user){
			res.status(404).send();
		}
		res.send(user);
	}catch(error){
		res.send(400).send(error);
	}
});

router.delete('/users/:id',async(req,res)=>{
	
	try{
		const user = await( UserModel.User.findByIdAndDelete(req.params.id));
		
		if(!user){
			res.status(404).send('"error":"Invalid Delete"');
		}
		res.send(user);
	}catch(e){
		res.status(400).send();
	}
})

module.exports = router;