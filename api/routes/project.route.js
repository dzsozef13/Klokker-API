const express = require('express');
const validate = require('../middlewares/validate');
const projectValidation = require('../validations/project.validation');
const projectController = require('../controllers/project.controller');
const { verifyToken } = require('../services/token.service');

const router = express.Router();

router.route('/')
    .post(verifyToken, validate(projectValidation.createProject), projectController.createProject)
    .get(verifyToken, validate(projectValidation.getProjects), projectController.getProjects);

router.route('/:projectId')
    .get(verifyToken, validate(projectValidation.getProject), projectController.getProject)
    .patch(verifyToken, validate(projectValidation.updateProject), projectController.updateProject)
    .delete(verifyToken, validate(projectValidation.deleteProject), projectController.deleteProject);

router.route('/team')
    .post(verifyToken, validate(projectValidation.assignToTeam), projectController.assignProjectToTeam);

module.exports = router;