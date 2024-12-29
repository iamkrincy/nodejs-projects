const express = require('express');

const routes = express.Router();

routes.use('/user',require('./UserRoutes'));
routes.use('/blog',require('./BlogRoutes'));
routes.use('/admin',require('./AdminRoutes'));
routes.use('/comment',require('./CommentsRoutes'));

module.exports = routes;