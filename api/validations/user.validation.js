const Joi = require('joi');

const createUser = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        name: Joi.string().required(),
        role: Joi.string().required().valid('user', 'admin')
    }),
};
  
const getUsers = {
    query: Joi.object().keys({
        name: Joi.string(),
        role: Joi.string(),
        _teamId: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer()
    }),
};

const getUser = {
    params: Joi.object().keys({
        userId: Joi.string(),
    }),
};

const getUserByEmail = {
    params: Joi.object().keys({
        email: Joi.string(),
    }),
}

const updateUser = {
    params: Joi.object().keys({
        userId: Joi.required(),
    }),
    body: Joi.object()
        .keys({
        email: Joi.string().email(),
        password: Joi.string(),
        name: Joi.string(),
        _teamId: Joi.optional(),
        invite: Joi.optional()
    })
    .min(1),
};

const assignToTeam = {
    body: Joi.object().keys({
        userId: Joi.required(),
        teamId: Joi.required()
    })
}

const inviteToTeam = {
    body: Joi.object().keys({
        email: Joi.required(),
        teamId: Joi.required()
    })
}

const deleteUser = {
    params: Joi.object().keys({
        userId: Joi.string()
    }),
};

module.exports = {
    createUser,
    getUsers,
    getUser,
    getUserByEmail,
    updateUser,
    assignToTeam,
    inviteToTeam,
    deleteUser
};
  