const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./api/routes');
const ApiError = require('./api/utils/ApiError');
const httpStatus = require('http-status');

const app = express();

// Body parser
app.use(bodyParser.json());

// Routes
app.use(routes);

// Unknown request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// Swagger config
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const swaggerDefinition = yaml.load('./swagger.yaml');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

module.exports = app;