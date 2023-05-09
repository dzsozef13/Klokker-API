const httpStatus = require('http-status');
const { Team, Project } = require('../domain/models');
const ApiError = require('../domain/errors/ApiError');

const createProject = async (projectBody) => {
    if (await Project.isNameTaken(projectBody.name)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
    }
    return Project.create(projectBody);
};

const getProjectById = async (id) => {
    return Project.findById(id);
};

const queryProjects = async (filter, options) => {
    const projects = await Project.find(filter, options);
    return projects;
};

const updateProjectWithId = async (projectId, updateBody) => {
    const project = await getProjectById(projectId);
    if (!project) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
    }
    if (updateBody.name && (await Project.isNameTaken(updateBody.name, projectId))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
    }
    Object.assign(project, updateBody);
    await project.save();
    return project;
};

const assignProjectToTeam = async (projectId, teamId) => {
    const project = await getProjectById(projectId);
    const team = Team.findOne(teamId);
    if (!project) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
    }
    if (!team) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Team not found')
    }
    if (await Project.doesBelong(projectId, teamId)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Project already belongs');
    }
    project._teamId = teamId;
    await project.save();
    return project;
};

const deleteProjectWithId = async (projectId) => {
    const project = await getProjectById(projectId);
    if (!project) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
    }
    await project.remove();
    return project;
};

module.exports = {
    createProject,
    getProjectById,
    queryProjects,
    updateProjectWithId,
    assignProjectToTeam,
    deleteProjectWithId,
};
