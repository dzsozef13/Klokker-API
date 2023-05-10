const userService = require('./user.service');
const ApiError = require('../domain/errors/ApiError');
const httpStatus = require('http-status');

const loginUserWithEmailAndPassword = async (email, password) => {
    const user = await userService.getUserByEmail(email);
    const passwordMatch = await user.isPasswordMatch(password);
    if (!user || !passwordMatch) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    }
    return user;
};

module.exports = {
    loginUserWithEmailAndPassword
};