const express = require('express');
const validate = require('../middlewares/validate');
const userValidation = require('../validations/user.validation');
const userController = require('../controllers/user.controller');
const { verifyToken } = require('../services/token.service');

const router = express.Router();

router.route('/')
    .post(validate(userValidation.createUser), userController.createUser)
    .get(verifyToken, validate(userValidation.getUsers), userController.getUsers);

router.route('/:userId')
    .get(verifyToken, validate(userValidation.getUser), userController.getUser)
    .patch(verifyToken, validate(userValidation.updateUser), userController.updateUser)
    .delete(verifyToken, validate(userValidation.deleteUser), userController.deleteUser);

router.route('/team')
    .post(verifyToken, validate(userValidation.assignToTeam), userController.assignUserToTeam);

module.exports = router;