const express = require('express');
const validate = require('../middlewares/validate');
const taskValidation = require('../validations/task.validation');
const taskController = require('../controllers/task.controller');
const { verifyToken } = require('../services/token.service');

const router = express.Router();

router.route('/')
    .post(validate(taskValidation.createTask), taskController.createTask)
    .get(verifyToken, validate(taskValidation.getTasks), taskController.getTasks);

router.route('/:taskId')
    .get(verifyToken, validate(taskValidation.getTask), taskController.getTask)
    .patch(verifyToken, validate(taskValidation.updateTask), taskController.updateTask)
    .delete(verifyToken, validate(taskValidation.deleteTask), taskController.deleteTask);

router.route('/assignee')
    .post(verifyToken, validate(taskValidation.assignToUser), taskController.assignTaskToUser);

router.route('/completed')
    .get(verifyToken, validate(taskValidation.toggleCompleted), taskController.toggleTaskCompleted);

module.exports = router;