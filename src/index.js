/**
 * http://usejsdoc.org/
 */
const express = require('express');
require('./db/mongoose.js');
const UserModel = require('./model/user.js');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/users',(req,res)=>{
	const user = new UserModel.User(req.body);
	user.save().then(()=>{
		res.send({status:200});
	}).catch((error)=>{
		res.status(400).send(error);
		
	})
})

app.listen(port, ()=> {
	console.log("Listening on port"+port)
})
