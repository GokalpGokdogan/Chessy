const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {

    const {auth} = req.headers;

    if(!auth){
        return res.status(401).send({error: 'You must be logged in.'});
    }

    console.log(auth);
    const token = auth.replace('Bearer ', '');

    try{
        const {id} = jwt.verify(token, process.env.JWT_KEY);
        req.user = await User.findById({_id: id}).select('_id');
        next();
        
    }catch(err){
        console.log(err);
        return res.status(401).send({error: 'You must be logged in.'});
    }


}

module.exports = requireAuth;