const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    mail:{
        type:String,
        required:true,
    },
    id:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    },{timestamps:true});

module.exports = mongoose.model('User',userSchema);    
