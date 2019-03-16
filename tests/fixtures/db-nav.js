const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const {User} = require('../../src/model/user')

const  userOneId = new mongoose.Types.ObjectId()
const  userOne ={
        _id:userOneId,
        name:"jogin User",
        email:"Jogin.user@gmail.com",
        password: "userLogin@2030",
        tokens : [{
            token: jwt.sign({_id:userOneId},process.env.TASKMANAGER_JWT_SECRET)
        }]
}

var setupDatabase = async()=>{
    await new User(userOne).save();
}


var clearDatabase = async()=>{
    await 
}

module.exports={
    userOneId,
    userOne,
    setupDatabase,
    clearDatabase
}