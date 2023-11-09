const mongoose = require('mongoose');
const express = require('express');

// mongoose.connect('mongodb://127.0.0.1:27017/expense-tracker');

const main = async () => {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/expense-tracker');
        console.log('connected to expense tracker database');
    }catch(error){
        console.error("Error connecting to the database");
    }
}
main();

const UsersSchema = new mongoose.Schema({
    userName:String,
    userPassword:String
})

//connect with mongoose expense-tracker db model - users
const Users = mongoose.model('users',UsersSchema);

const app = express();

//Get users
app.get('/users', async (req,res) => {
    try {
        const usersData = await Users.find();
        res.json(usersData);
    } catch (error) {
        console.error(error);
    }
})

//Middleware
app.use(express.json());

//register new user
app.post('/register-user', async (req,res) => {
    try {
        const {userName, userPassword} = req.body;
        const newUser = new Users({userName,userPassword});
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
    }
})

//login user
app.post('/login-user', async (req,res) => {
    try {
        const {loginUserName,loginUserPassword} = req.body;
        const loginUser = await Users.findOne({userName:loginUserName});
        res.json(loginUser);
    } catch (error) {
        console.error(error);
    }
})

//listen server
// app.listen(5000,() => {
//     console.log('server listening at port 5000');
// })