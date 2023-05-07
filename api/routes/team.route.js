const express = require('express');
const validate = require('../middlewares/validate');
const teamValidation = require('../validations/team.validation');
const teamController = require('../controllers/team.controller');
const { verifyToken } = require('../services/token.service');

const router = express.Router();

router.route('/')
    .post(verifyToken, validate(teamValidation.createTeam), teamController.createTeam)
    .get(verifyToken, validate(teamValidation.getTeams), teamController.getTeams);

router.route('/:teamId')
    .get(verifyToken, validate(teamValidation.getUser), teamController.getTeam)
    .patch(verifyToken, validate(teamValidation.updateUser), teamController.updateTeam)
    .delete(verifyToken, validate(teamValidation.deleteUser), teamController.deleteTeam);

module.exports = router;