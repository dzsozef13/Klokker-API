const httpStatus = require('http-status');
const pick = require('../middlewares/pick');
const ApiError = require('../domain/errors/ApiError');
const catchAsync = require('../middlewares/catchAsync');
const { userService } = require('../services');
const hash = require('../middlewares/hash');
const chop = require('../middlewares/chop');

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
    var user = await userService.getUserById(req.params.userId);
    user = chop(user, ['password']);
    res.send(user);
});

const getUserByEmail = catchAsync(async (req, res) => {
    var user = await userService.getUserByEmail(req.params.email);
    user = chop(user, ['password']);
    res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
    const user = await userService.updateUserWithId(req.params.userId, req.body);
    res.send(user);
});

const assignUserToTeam = catchAsync(async (req, res) => {
    const user = await userService.assignUserToTeam(req.body.userId, req.body.teamId);
    const assignedUser = await userService.updateUserWithId(user._id, {role: 'user'});
    res.send(assignedUser);
});

const inviteUserToTeam = catchAsync(async (req, res) => {
    const user = await userService.getUserByEmail(req.body.email);
    console.log(user);
    const invitedUser = await userService.updateUserWithId(user._id, {invite: req.body.teamId});
    res.send(invitedUser);
});

const deleteUser = catchAsync(async (req, res) => {
    await userService.deleteUserWithId(req.params.userId);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createUser,
    getUsers,
    getUser,
    getUserByEmail,
    updateUser,
    assignUserToTeam,
    inviteUserToTeam,
    deleteUser,
};
