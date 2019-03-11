/**
 * http://usejsdoc.org/
 */


const express = require('express');
const UserModel = require('../model/user.js');
const router = new express.Router();



router.post('/users',async(req,res)=>{
	const user = new UserModel.User(req.body);
	try{
	 await(user.save());
	 res.status(201).send(user);
	}catch(e){
		res.status(400).send(error);
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
	const allowedUpdates = ['user','email','password'];
	const updates = Object.keys(req.body);
	
	const isValidOperation = updates.every((key)=>{
		return allowedUpdates.includes(key);
	});
	if(!isValidOperation){
		return res.status(400).send('{"error": "Invalid Updates"}');
	}
	try{
		const user = await (UserModel.User.findByIdAndUpdate(req.params.id,req.body,{ new:true, runValidators:true }));
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