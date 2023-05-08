const httpStatus = require('http-status');
const { User, Team } = require('../domain');
const ApiError = require('../domain/errors/ApiError');

const createUser = async (userBody) => {
    if (await User.isEmailTaken(userBody.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    return User.create(userBody);
};

const getUserById = async (id) => {
    return User.findById(id);
};

const getUserByEmail = async (email) => {
    return User.findOne({ email });
};

const queryUsers = async (filter, options) => {
    const users = await User.find(filter, options);
    return users;
};

const updateUserWithId = async (userId, updateBody) => {
    const user = await getUserById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    Object.assign(user, updateBody);
    await user.save();
    return user;
};

const assignUserToTeam = async (userId, teamId) => {
    const user = await getUserById(userId);
    const team = Team.findOne(teamId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    if (!team) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Team not found')
    }
    if (await User.isMember(userId, teamId)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'User is already member');
    }
    user._teamId = teamId;
    await user.save();
    return user;
};

const deleteUserWithId = async (userId) => {
    const user = await getUserById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    await user.remove();
    return user;
};

module.exports = {
    createUser,
    getUserById,
    getUserByEmail,
    queryUsers,
    updateUserWithId,
    assignUserToTeam,
    deleteUserWithId,
};
