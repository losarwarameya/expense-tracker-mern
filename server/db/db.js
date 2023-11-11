const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/expense-tracker');

const UsersSchema = new mongoose.Schema({
    userName: {
      type:String,
      required:true,
      unique:true
    },
    userPassword: {
      type:String,
      required:true
    }
},{timestamps:true});

const EntriesSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    userId:{
      type:String,
      required:true
    },date:{
      type:Date,
      required:true
    }
  },{timestamps: true});

const Users = mongoose.model('users', UsersSchema);

const Entries = mongoose.model('entries',EntriesSchema);

module.exports = {
    Users,
    Entries
};