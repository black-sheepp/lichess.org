const jwt = require('jsonwebtoken');
const User = require('../model/user');

// Middleware function for JWT token authentication
module.exports.authenticateToken = async function(req, res, next){
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Access denied, token missing' });
    }

    try {
        const decoded = await jwt.verify(token, "shivamguptanitw");
        const verifyUser = await User.findById(decoded.id);
        if(verifyUser){
            next();
        }else{
            return res.status(401).json({ message: 'Token is not valid' });
        }
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};