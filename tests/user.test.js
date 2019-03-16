const request = require('supertest')
const app = require('../src/app');
const {User} = require('../src/model/user')

const userOne ={
    name:"Login User",
    email:"login.user@gmail.com",
    password: "userLogin@2030"
}

beforeEach(async ()=>{
    console.log('Before each test case. Wiping out db.')
    await User.deleteMany()
    await new User(userOne).save();
    
})

afterEach(()=>{
    console.log('After Each.')
})

test('Should signup a new user',async ()=>{
    await request(app).post('/users').send({
        name:"Navdeep Singh",
        email:"navdeep.singh12@gmail.com",
        password: "tesTs@pass20"
    }).expect(201);
})


test('Should login existing user', async ()=>{
    await request(app).post('/users/login').send({
        email:userOne.email,
        password:userOne.password
    }).expect(200);
})

//Test login failure with non existing user.

test('Should not login with wrong credentials', async()=>{
    await request(app).post('/users/login').send({
        email:userOne.email,
        password:'IncorrectPassword'
    }).expect(400);
})

