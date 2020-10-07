const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config/default.json')

const User = require('../models/Users')


// User Registration Route
// Post User /api/users
router.post('/', [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is required'),
    body('password').isLength({
        min:6
    }).withMessage('Password must be at least 6 chars long')
] , async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {name, email, password} = req.body;

    try{
       let user = await User.findOne({email})

       if(user){
        return res.status(400).json({errors: {msg: 'User already exist'}})
       }

       const avatar = gravatar.url( req.body.email, {
        s: '200', r: 'pg', d: 'mm'
       });

       user = new User({
           name,
           email,
           password,
           avatar
       })

       user.password = await bcrypt.hash(password, 10)

       await user.save();

       const payload = {
           user: {
               id: user.id,
               name: user.name
           }
       };

       jwt.sign(
           payload,
           config.jwtPrivateKey,
           {
               expiresIn: 36000
           }, (err, token) => {
                if(err){
                    return res.json({msg: err.message})
                }

                res.status(200).json({token})
           }
       )



    }catch(err){
        console.log(err);
        res.status(500).send('Server Error')
    }
})

module.exports = router;