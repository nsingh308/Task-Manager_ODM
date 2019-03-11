/**
 * http://usejsdoc.org/
 */
//Initialize the mongoose.
require('./db/mongoose_init.js');

const express = require('express');

//Import the routes
const usersRouter = require('./routers/users.js');
const tasksRouter = require('./routers/tasks.js');

const app = express();
const port = 3000;

app.use(express.json());
app.use(usersRouter);
app.use(tasksRouter);

app.listen(port, ()=> {
	console.log("Listening on port "+port)
})
