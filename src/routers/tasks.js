/**
 * http://usejsdoc.org/
 */
const express = require('express');
const TaskModel = require('../model/task.js');
const router = new express.Router();


router.post('/tasks',async(req,res)=>{
	const task = new TaskModel.Task(req.body);
	try{
		 await(task.save());
		res.status(201).send(task);
	}catch(error){
		res.status(400).send(error);
	}
})



router.get('/tasks',async(req, res)=>{
	try{
		const tasks = await (TaskModel.Task.find({}));
		res.send(tasks);
	}catch(error){
		res.status(500).send(error);
	}
})

router.get('/tasks/:id',async(req, res)=>{
	const _id = req.params.id;
	
	try{
		const task = await(TaskModel.Task.findById(_id));
		if(!task){
			return res.status(404).send();
		}
		res.send(task);
	}catch(error){
		res.status(500).send(error);
	}
})

router.patch('/tasks/:id', async(req, res)=>{
	const allowedUpdates = ['name','duration'];
	const updates = Object.keys(req.body);
	
	const isValidOperation = updates.every((key)=>{
		return allowedUpdates.includes(key);
	});
	
	if(!isValidOperation){
		return res.status(400).send('{"error":"Invalid Updates"}');
	}
	try{
		const task  = await(TaskModel.Task.findById(req.params.id));
		
		updates.forEach((key)=>{
			task[key]= req.body[key];//will assign the value of req.body[key] to task 
		})
		
		await task.save();
		
		//below call could not attach a middleware because its a direct call with mongodb.
		//const task = await(TaskModel.Task.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators:true}));
		
		
		if(!task){
			res.status(404).send();
		}
		res.send(task);
	}catch(error){
		res.status(400).send(error);
	}
	
});


router.delete('/tasks/:id',async(req,res)=>{
	
	try{
		const task = await( TaskModel.Task.findByIdAndDelete(req.params.id));
		
		if(!task){
			res.status(404).send('"error":"Invalid Delete"');
		}
		res.send(task);
	}catch(e){
		res.status(400).send();
	}
})

module.exports = router;