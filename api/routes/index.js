const express = require('express');
const welcomeRoute = require('./welcome.route');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const teamRoute = require('./team.route');
const projectRoute = require('./project.route');
const taskRoute = require('./task.route');

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
      },
      {
        path: '/team',
        route: teamRoute,
      }
      ,
      {
        path: '/project',
        route: projectRoute,
      }
      ,
      {
        path: '/task',
        route: taskRoute,
      }
];

routes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
