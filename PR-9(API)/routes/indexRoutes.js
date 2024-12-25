const express = require('express');

const routes = express.Router();

routes.use('/',require('./AuthRoutes'));
routes.use('/user',require('./UserRoutes'));
routes.use('/post',require('./PostRoutes'));
routes.use('/admin',require('./AdminRoutes'));
routes.use('/comment',require('./CommentsRoutes'));

module.exports = routes;