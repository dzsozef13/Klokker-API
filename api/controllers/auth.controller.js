const httpStatus = require('http-status');
const catchAsync = require('../middlewares/catchAsync');
const { authService, tokenService, userService } = require('../services');
const chop = require('../middlewares/chop');

const register = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body);
    const token = await tokenService.generateAuthToken(user);
    res.status(httpStatus.CREATED).send({ user, token });
});

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    var user = await authService.loginUserWithEmailAndPassword(email, password);
    const token = await tokenService.generateAuthToken(user);
    user = chop(user, ['password']);
    res.send({ user, token });
});

module.exports = {
    register,
    login
};