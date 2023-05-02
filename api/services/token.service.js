const jwt = require('jsonwebtoken');
const config = require('../config/config');

const generateAuthToken = (user) => {
    return jwt.sign({ _id: user._id }, config.tokenSecret);
}

const generateRefreshToken = (user) => {
    return jwt.sign({ _id: user._id }, config.tokenSecret);
}

const verifyToken = (req, res, next) => {
    const token = req.header("auth-token");

    if (!token) return res.status(401).json({ error: "Access Denied" });

    try {
        const verified = jwt.verify(token, config.tokenSecret);
        req.user = verified;
        next();        
    } catch (error) {
        res.status(400).json({ error: "Token is not valid"});
    }
}

module.exports = {
    generateAuthToken,
    generateRefreshToken,
    verifyToken
};