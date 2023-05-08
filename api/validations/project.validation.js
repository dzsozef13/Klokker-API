const Joi = require('joi');

const createProject = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        _teamId: Joi.string().required(),
    }),
};
  
const getProjects = {
    query: Joi.object().keys({
        name: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const getProject = {
    params: Joi.object().keys({
        projectId: Joi.string(),
    }),
};

const updateProject = {
    params: Joi.object().keys({
        projectId: Joi.required(),
    }),
    body: Joi.object()
        .keys({
        name: Joi.string(),
        description: Joi.string(),
        _teamId: Joi.string()
    })
    .min(1),
};

const assignToTeam = {
    body: Joi.object().keys({
        projectId: Joi.required(),
        teamId: Joi.required()
    })
}

const deleteProject = {
    params: Joi.object().keys({
        projectId: Joi.string(),
    }),
}; 

module.exports = {
    createProject,
    getProjects,
    getProject,
    updateProject,
    assignToTeam,
    deleteProject,
};
  