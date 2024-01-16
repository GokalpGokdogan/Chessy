const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    mail:{
        type:String,
        required:true,
        unique:true,
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

userSchema.statics.signup = async function(mail, password){
    
    //validate mail and password
    if( !mail || !password){
        throw new Error('Please provide mail and/or password');
    }
    if(!validator.isEmail(mail)){
        throw new Error('Please provide a valid email');
    }
    if(!validator.isStrongPassword(password)){
        throw new Error('Please provide a strong password');
    }


    const user = await this.findOne({mail});
    if(user){
        throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    let id = await this.countDocuments() + 1;

    let idCheck = await this.findOne({id});
    

    while(idCheck){
        id += 1;
        idCheck = await this.findOne({id});
    }
    

    const newUser = await this.create({mail, password:hashedPassword, id});

    return newUser;
}

userSchema.statics.login = async function(mail, password){
    if(!mail || !password){
        throw new Error('Please provide mail and/or password');
    }

    const user = await this.findOne({mail});
    if(!user){
        throw new Error('Incorrect email');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error('Invalid password');
    }

    return user;
}

module.exports = mongoose.model('User',userSchema);    
