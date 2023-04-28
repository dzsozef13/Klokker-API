const userService = require('./user.service');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const loginUserWithEmailAndPassword = async (email, password) => {
    const user = await userService.getUserByEmail(email);
    console.log(user)
    if (!user || !(await user.isPasswordMatch(password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    }
    return user;
};

module.exports = {
    loginUserWithEmailAndPassword
};