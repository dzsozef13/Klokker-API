const Joi = require('joi');

const createTeam = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string(),
        _ownerId: Joi.string().required(),
    }),
};
  
const getTeams = {
    query: Joi.object().keys({
        name: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const getTeam = {
    params: Joi.object().keys({
        teamId: Joi.string(),
    }),
};

const updateTeam = {
    params: Joi.object().keys({
        teamId: Joi.required(),
    }),
    body: Joi.object()
        .keys({
        name: Joi.string(),
        owner: Joi.string(),
        _ownerId: Joi.string()
    })
    .min(1),
};

const deleteTeam = {
    params: Joi.object().keys({
        teamId: Joi.string(),
    }),
}; 

module.exports = {
    createTeam,
    getTeams,
    getTeam,
    updateTeam,
    deleteTeam
};
  