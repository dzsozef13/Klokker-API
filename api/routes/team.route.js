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
    .get(verifyToken, validate(teamValidation.getTeam), teamController.getTeam)
    .patch(verifyToken, validate(teamValidation.updateTeam), teamController.updateTeam)
    .delete(verifyToken, validate(teamValidation.deleteTeam), teamController.deleteTeam);

module.exports = router;