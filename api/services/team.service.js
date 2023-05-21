const httpStatus = require('http-status');
const { Team } = require('../domain/models');
const ApiError = require('../domain/errors/ApiError');

const createTeam = async (teamBody) => {
    if (await Team.isNameTaken(teamBody.name)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
    }
    return Team.create(teamBody);
};

const getTeamById = async (id) => {
    return Team.findById(id);
};

const queryTeams = async (filter, options) => {
    const teams = await Team.find(filter, options);
    return teams;
};

const updateTeamWithId = async (teamId, updateBody) => {
    const team = await getTeamById(teamId);
    if (!team) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Team not found');
    }
    if (updateBody.name && (await Team.isNameTaken(updateBody.name, teamId))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
    }
    Object.assign(team, updateBody);
    await team.save();
    return team;
};

const deleteTeamWithId = async (teamId) => {
    const team = await getTeamById(teamId);
    if (!team) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Team not found');
    }
    await team.remove();
    return team;
};

module.exports = {
    createTeam,
    getTeamById,
    queryTeams,
    updateTeamWithId,
    deleteTeamWithId,
};
