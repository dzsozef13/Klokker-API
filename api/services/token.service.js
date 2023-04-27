const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
}

const verifyToken = (req, res, next) => {
    const token = req.header("auth-token");

    if (!token) return res.status(401).json({ error: "Access Denied" });

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();        
    } catch (error) {
        res.status(400).json({ error: "Token is not valid"});
    }
}

module.exports = {
    generateToken,
    verifyToken
 };