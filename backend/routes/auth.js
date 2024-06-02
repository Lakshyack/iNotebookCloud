const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {body,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');
// const { Schema } = mongoose;

//create a user using : POST "/api/auth/createuser". NO longin required
const JWT_SECRET = "Harryisagoodb$oy";

router.post('/createUser', [
    body('name', "Enter a valid Name!").isLength({ min: 3 }),
    body('email', "Enter a valid Email!").isEmail(),
    body('password', "Password must contain at least 5 characters").isLength({ min: 5 }),
], async (req, res) => {
    // If there are errors, return Bad request and the errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });

    }
try {
    // Check weather the user with email exit already
        let user  =await User.findOne({email: req.body.email});
        if(user) {
            return res.status(400).json({error :"Sorry a user with this email already exists"});
        }
        // craete a salt for our password
        const salt = await bcrypt.genSalt(10);
        // create a seceret password by bcrypt js
     const secPass = await bcrypt.hash(req.body.password,salt)
        //crate a new user
         user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        });
        const data = {
            user :{
                id:user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
    
        // res.json(user);
res.json({authToken})
    } 
    
    catch (err) {
        console.log(err.message);
        res.status(500).send("some Error Occured");
        
    }
});


//Authenticate a user : POST "/api/auth/login". NO longin required 
router.post('/login', [
    body('email', "Enter a valid Email!").isEmail(),
    body('password', "Password cannot be c=blank!").exists(),
], async (req, res) => {
// If there are errors, return Bad request and the errors
const result = validationResult(req);
if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
}

const {email, password} = req.body;
try{

    let user =await User.findOne({email});
    if(!user){
        return res.status(400).json({error : "Please try to login with correct Credentionls"});
    }
    const passwordCompare =await bcrypt.compare(password,user.password);
    if(!passwordCompare){
        return res.status(400).json({error : "Please try to login with correct Credentionls"});
    }
    const data = {
        user :{
            id:user.id
        }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
res.json({authToken})
}catch(err){
    console.log(err.message);
    res.status(500).send("some Error Occured");
}
    
});
module.exports = router;
