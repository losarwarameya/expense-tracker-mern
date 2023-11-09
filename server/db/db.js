const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/expense-tracker');

const UsersSchema = new mongoose.Schema({
    userName: String,
    userPassword: String
});

const Users = mongoose.model('users', UsersSchema);

module.exports = {
    Users
};