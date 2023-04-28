const express = require('express');
const welcomeRoute = require('./welcome.route');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');

const router = express.Router();

const routes = [
    {
        path: '/',
        route: welcomeRoute,
    },
    {
        path: '/auth',
        route: authRoute,
      },
      {
        path: '/user',
        route: userRoute,
      }
];

routes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
