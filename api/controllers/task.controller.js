const httpStatus = require('http-status');
const pick = require('../middlewares/pick');
const ApiError = require('../domain/errors/ApiError');
const catchAsync = require('../middlewares/catchAsync');
const { taskService, userService, projectService } = require('../services');
const chop = require('../middlewares/chop');

const createTask = catchAsync(async (req, res) => {
    const task = await taskService.createTask(req.body);
    res.status(httpStatus.CREATED).send(task);
});

const getTask = catchAsync(async (req, res) => {
    var task = await taskService.getTaskById(req.params.taskId);
    var assignee = await userService.getUserById(task._assigneeId);
    var project = await projectService.getProjectById(task._projectId);
    task = chop(task, ['_assigneeId', '_projectId']);
    task.assignee = assignee;
    task.project = project;
    res.send(task);
});

const getTasks = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['name', '_projectId']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const tasks = await taskService.queryTasks(filter, options);
    res.send(tasks);
});

const updateTask = catchAsync(async (req, res) => {
    const task = await taskService.updateTaskWithId(req.params.taskId, req.body);
    res.send(task);
});

const assignTaskToUser = catchAsync(async (req, res) => {
    const task = await taskService.assignTaskToUser(req.body.taskId, req.body.userId);
    res.send(task);
});

const toggleTaskCompleted = catchAsync(async (req, res) => {
    const task = await taskService.toggleTaskCompleted(req.params.taskId);
    res.send(task);
});

const deleteTask = catchAsync(async (req, res) => {
    await taskService.deleteTaskWithId(req.params.taskId);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createTask,
    getTask,
    getTasks,
    updateTask,
    assignTaskToUser,
    toggleTaskCompleted,
    deleteTask,
};