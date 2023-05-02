const jwt = require('jsonwebtoken');
const config = require('../config/config');

const generateAuthToken = (user) => {
    return jwt.sign({ _id: user._id }, config.tokenSecret);
}

const generateRefreshToken = (user) => {
    return jwt.sign({ _id: user._id }, config.tokenSecret);
}

const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Access Denied" });
    }

    const token = authHeader.substring(7);

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