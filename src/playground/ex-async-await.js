const dbConfigReader = require('../db/dbConfigReader.js');
const mongoose = require('mongoose');
const dbURL = dbConfigReader.loadConfig();

mongoose.connect(dbURL, {useNewUrlParser : true,
						useCreateIndex:true,
						useFindAndModify:false});


const UserModel = require('../model/user.js');

//UserModel.User.findByIdAndUpdate("5c827abe2332513a9832342b", {email:"dummyEmail@gmail.com"})
//.then((user)=>{
//	console.log("updated"+user);
//	return UserModel.User.countDocuments({email:"dummyEmail@gmail.com"})
//}).then((userCount)=>{
//	console.log(userCount);
//}).catch((e)=>{
//	console.log("Failed to update");
//})


var updateAndCount = async(id,email)=>{
		var user = await(UserModel.User.findByIdAndUpdate(id,{email}));
		var count = await(UserModel.User.countDocuments({email}));
		return count;
}


updateAndCount("5c842deaaebfb5cff40927dc","donky@gmail.com").then((result)=>{
	return console.log(result);
}).catch((error)=>{
	return console.log(error)
});