const Joi = require('joi');

const createTask = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        _projectId: Joi.string().required(),
    }),
};
  
const getTasks = {
    query: Joi.object().keys({
        title: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const getTask = {
    params: Joi.object().keys({
        taskId: Joi.string().required(),
    }),
};

const updateTask = {
    params: Joi.object().keys({
        taskId: Joi.required(),
    }),
    body: Joi.object()
        .keys({
        title: Joi.string(),
        description: Joi.string(),
        allocMinutes: Joi.number(),
        usedMinutes: Joi.number(),
        dueDate: Joi.date(),
        billable: Joi.bool(),
        completed: Joi.bool()
    })
    .min(1),
};

const assignToUser = {
    body: Joi.object().keys({
        taskId: Joi.required(),
        userId: Joi.required()
    })
};

const toggleCompleted = {
    params: Joi.object().keys({
        taskId: Joi.required(),
    })
};

const deleteTask = {
    params: Joi.object().keys({
        teamId: Joi.string(),
    }),
}; 

module.exports = {
    createTask,
    getTasks,
    getTask,
    updateTask,
    assignToUser,
    toggleCompleted,
    deleteTask
};
  