const httpStatus = require('http-status');
const { Task, User } = require('../domain/models');
const ApiError = require('../domain/errors/ApiError');

const createTask = async (taskBody) => {
    return Task.create(taskBody);
};

const getTaskById = async (id) => {
    return Task.findById(id);
};

const queryTasks = async (filter, options) => {
    const tasks = await Task.find(filter, options);
    return tasks;
};

const updateTaskWithId = async (taskId, updateBody) => {
    const task = await getTaskById(taskId);
    if (!task) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
    }
    Object.assign(task, updateBody);
    await task.save();
    return task;
};

const assignTaskToUser = async (taskId, userId) => {
    var task = await getTaskById(taskId);
    var user = await User.findById(userId);
    if (!task) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
    }
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    if (await Task.isAssigned(taskId, userId)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'User is already assigned');
    }
    task._assigneeId = userId;
    await task.save();
    return task;
};

const toggleTaskCompleted = async (taskId) => {
    var task = await getTaskById(taskId);
    if (!task) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
    }
    if (task.completed.empty()) {
        task.completed = true
    } else {
        task.completed = !task.completed
    }
    await task.save()
    return task;
}

const deleteTaskWithId = async (taskId) => {
    const task = await getTaskById(taskId);
    if (!task) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
    }
    await task.remove();
    return task;
};

module.exports = {
    createTask,
    getTaskById,
    queryTasks,
    updateTaskWithId,
    assignTaskToUser,
    toggleTaskCompleted,
    deleteTaskWithId,
};
