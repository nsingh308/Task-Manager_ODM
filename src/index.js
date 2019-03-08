/**
 * http://usejsdoc.org/
 */
const express = require('express');
require('./db/mongoose.js');

const UserModel = require('./model/user.js');
const TaskModel = require('./model/task.js');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/user',(req,res)=>{
	const user = new UserModel.User(req.body);
	user.save().then(()=>{
		res.send({status:200});
	}).catch((error)=>{
		res.status(400).send(error);
		
	})
})


app.post('/task',(req,res)=>{
	const task = new TaskModel.Task(req.body);
	task.save().then(()=>{
		res.send({status:200});
	}).catch((error)=>{
		res.status(400).send(error);
		
	})
})

app.listen(port, ()=> {
	console.log("Listening on port"+port)
})
