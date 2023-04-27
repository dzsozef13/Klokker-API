const express = require('express');
const welcomeRoute = require('./welcome.route');

const router = express.Router();

const routes = [
    {
        path: '/',
        route: welcomeRoute,
    },
];

routes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
