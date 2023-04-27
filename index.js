const mongoose = require('mongoose');
const app = require('./app');
const config = require('./api/config/config');

let server;
mongoose.connect(config.dbHost, config.dbOptions).then(() => {
    console.log('Connected to MongoDB');
    server = app.listen(config.port, () => {
        console.log(`Listening to port ${config.port}`);
    });
mongoose.set('strictQuery', false);
});

const exitHandler = () => {
    if (server) {
        server.close(() => {
        console.log('Server closed');
        process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    console.log(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    console.log('SIGTERM received');
    if (server) {
        server.close();
    }
});
