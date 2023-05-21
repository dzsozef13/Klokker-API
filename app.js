const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./api/routes');
const ApiError = require('./api/domain/errors/ApiError');
const httpStatus = require('http-status');
const mongoose = require('mongoose');
const config = require('./api/config/config');
const cors = require("cors");

const app = express();

const corsOptions ={
   origin: '*', 
   credentials: true,
   optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

// Body parser
app.use(bodyParser.json());

// Routes
app.use(routes);

// Unknown request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500);
    res.setHeader('Content-Type', 'application/json');
    res.json({
        error: {
            status: err.statusCode,
            message: err.message
        }
    });
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