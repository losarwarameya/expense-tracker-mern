const express = require('express');
const Users = require('../db/db.js').Users; // Assuming you export Users model from db.js

const usersRouter = express.Router();

usersRouter.get('/users', async (req, res) => {
    try {
        const usersData = await Users.find();
        res.json(usersData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

usersRouter.post('/register-user', async (req, res) => {
    try {
        const {userName, userPassword} = req.body;
        const newUser = new Users({userName, userPassword});
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

usersRouter.post('/login-user', async (req, res) => {
    try {
        const {loginUserName, loginUserPassword} = req.body;
        const loginUser = await Users.findOne({userName: loginUserName});
        if(!loginUser){
            res.status(400).send("Invalid Username");
        }else if(loginUser.userPassword !== loginUserPassword){
            res.status(400).send("Invalid Password");
        }else{
            res.send(loginUser._id);
            // res.json(loginUser)
            // res.status(200).send("Login successful");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = usersRouter;
