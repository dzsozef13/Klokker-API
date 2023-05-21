const httpStatus = require('http-status');
const pick = require('../middlewares/pick');
const catchAsync = require('../middlewares/catchAsync');
const { projectService } = require('../services');
const chop = require('../middlewares/chop');

const createProject = catchAsync(async (req, res) => {
    const project = await projectService.createProject(req.body);
    res.status(httpStatus.CREATED).send(project);
});

const getProject = catchAsync(async (req, res) => {
    var project = await projectService.getProjectById(req.params.projectId);
    res.send(project);
});

const getProjects = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['name', '_teamId']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const projects = await projectService.queryProjects(filter, options);
    res.send(projects);
});

const updateProject = catchAsync(async (req, res) => {
    const project = await projectService.updateProjectById(req.params.projectId, req.body);
    res.send(project);
});

const assignProjectToTeam = catchAsync(async (req, res) => {
    const project = await projectService.assignProjectToTeam(req.body.projectId, req.body.teamId);
    res.send(project);
});

const deleteProject = catchAsync(async (req, res) => {
    await projectService.deleteProjectWithId(req.params.projectId);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createProject,
    getProject,
    getProjects,
    updateProject,
    assignProjectToTeam,
    deleteProject
};