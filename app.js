const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./api/routes');
const ApiError = require('./api/utils/ApiError');
const httpStatus = require('http-status');
const mongoose = require('mongoose');
const config = require('./api/config/config');

const app = express();

// Body parser
app.use(bodyParser.json());

// Routes
app.use(routes);

// Unknown request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

let server;
mongoose.connect(config.dbHost, config.dbOptions).then(() => {
    console.log('Connected to MongoDB');
    server = app.listen(config.port, () => {
        console.log(`Listening to port ${config.port}`);
    });
mongoose.set('strictQuery', false);
});

// Swagger config
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const swaggerDefinition = yaml.load('./swagger.yaml');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

module.exports = app;