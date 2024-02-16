const User = require('../models/userModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


//create a token

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn:  1 * 18 * 60 * 60 //18 hours
    });
}

//get all users

const getUsers = async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    } catch(err){
        res.status(400).json({error: err.message});
    }
}


//get one user

const getUser = async (req, res) => {  
    const {id} = req.params;

    // if(!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.status(404).send('No user with that id');
    // }

    try{
        const user = await User.findOne({id:id});
        res.status(200).json(user);
    } catch(err){
        res.status(404).json({error: err.message});
    }
}


//create a user

const createUser = async (req, res) => {
    const {mail, id, password} = req.body;
    try{
        const user = await User.create({mail, id, password});
        res.status(200).json(user);
    
    } catch(err){
        res.status(400).json({error: err.message});
    }
}

//delete a user

const deleteUser = async (req, res) => {
    const {id} = req.params;

    // if(!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.status(404).send('No user with that id');
    // }

    try{
        
        const userId = await User.findOne({id:id}).select('_id');

        console.log(userId);
        
        if(!mongoose.Types.ObjectId.isValid(userId._id)) {
            return res.status(404).send('No user with that id');
        }

        const user = await User.findByIdAndDelete({_id:userId._id});
        res.status(200).json(user);
    } catch(err){
        res.status(400).json({error: err.message});
    }
}


//update a user

const updateUser = async (req, res) => {
    const {id} = req.params;

    // if(!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.status(404).send('No user with that id');
    // }
    
    try{
        const userId = await User.findOne({id:id}).select('_id');
        
        if(!mongoose.Types.ObjectId.isValid(userId._id)) {
            return res.status(404).send('No user with that id');
        }
        const user = await User.findByIdAndUpdate({_id:userId._id}, {...req.body}, {new: true});
        res.status(200).json(user);
    } catch(err){
        res.status(400).json({error: err.message});
    }
}


//delete all users

const deleteUsers = async (req, res) => {
    try{
        const users = await User.deleteMany();
        res.status(200).json(users);
    } catch(err){
        res.status(400).json({error: err.message});
    }
}

//sign up a user


const register = async (req, res) => {
    const {mail, password} = req.body;
    try{
        const user = await User.register(mail, password);
        const token = createToken(user._id);
        res.status(200).json({user, token});
    
    } catch(err){
        res.status(400).json({error: err.message});
    }
}

//login a user

const login = async (req, res) => {
    const {mail, password} = req.body;
    try{
        const user = await User.login(mail, password);
        const token = createToken(user._id);
        res.status(200).json({user, token});
    
    } catch(err){
        res.status(400).json({error: err.message});
    }
}

//export functions
module.exports = { createUser, getUsers, getUser, deleteUser, updateUser, deleteUsers, register, login };