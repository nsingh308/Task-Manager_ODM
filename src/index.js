/**
 * http://usejsdoc.org/
 */
const express = require('express');

const app = express();
const port = 3000;

app.post('/users',(req,res)=>{
	res.send('Testing')
	console.log('Testing');
})

app.listen(port, ()=> {
	console.log("Listening on port"+port)
})
