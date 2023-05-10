const httpStatus = require('http-status');
const pick = require('../middlewares/pick');
const ApiError = require('../domain/errors/ApiError');
const catchAsync = require('../middlewares/catchAsync');
const { userService } = require('../services');
const hash = require('../middlewares/hash');

const createUser = catchAsync(async (req, res) => {
    var userBody = req.body;
    userBody.password = await hash(userBody.password);
    const user = await userService.createUser(req.body);
    res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await userService.queryUsers(filter, options);
    res.send(result);
});

const getUser = catchAsync(async (req, res) => {
    const user = await userService.getUserById(req.params.userId);
    res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
    const user = await userService.updateUserWithId(req.params.userId, req.body);
    res.send(user);
});

const assignUserToTeam = catchAsync(async (req, res) => {
    const user = await userService.assignUserToTeam(req.body.userId, req.body.teamId);
    res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
    await userService.deleteUserWithId(req.params.userId);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    assignUserToTeam,
    deleteUser,
};
