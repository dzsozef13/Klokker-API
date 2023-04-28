const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, tokenService, userService } = require('../services');

const register = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body);
    const token = await tokenService.generateAuthToken(user);
    res.status(httpStatus.CREATED).send({ user, token });
});

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    const token = await tokenService.generateAuthToken(user);
    res.send({ user, token });
});

module.exports = {
    register,
    login
};