const httpStatus = require('http-status');
const pick = require('../middlewares/pick');
const ApiError = require('../domain/errors/ApiError');
const catchAsync = require('../middlewares/catchAsync');
const { teamService, userService } = require('../services');
const chop = require('../middlewares/chop');

const createTeam = catchAsync(async (req, res) => {
    const team = await teamService.createTeam(req.body);
    res.status(httpStatus.CREATED).send(team);
});

const getTeam = catchAsync(async (req, res) => {
    var team = await teamService.getTeamById(req.params.teamId);
    var owner = await userService.getUserById(team._ownerId);
    team = chop(team, ['_ownerId']);
    team.owner = chop(owner, ['_teamId', 'password']);
    res.send(team);
});

const getTeams = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['name']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await teamService.queryTeams(filter, options);
    res.send(result);
});

const updateTeam = catchAsync(async (req, res) => {
    const team = await teamService.updateTeamWithId(req.params.teamId, req.body);
    res.send(team);
});

const deleteTeam = catchAsync(async (req, res) => {
    await teamService.deleteTeamWithId(req.params.teamId);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createTeam,
    getTeam,
    getTeams,
    updateTeam,
    deleteTeam,
};