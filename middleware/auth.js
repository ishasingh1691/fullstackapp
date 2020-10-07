const jwt = require('jsonwebtoken')
const config = require('../config/default.json');
const User = require('../models/Users');

module.exports = async (req, res, next) => {
    const token = req.header('x-auth-token');

    if(!token){
        return res.status(401).json([{
            msg: 'No Token, authorization denied'
        }])
    }

    let decode = jwt.verify(token, config.jwtPrivateKey)

    try{
       req.user = decode.user
       next()
    }catch(err){
        res.status(400).json([{
            msg:'Invalid Token'
        }])
    }

}