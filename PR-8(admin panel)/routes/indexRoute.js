const express = require('express');

const routes = express.Router();

routes.use('/',require('./AuthRoutes'));
routes.use('/category',require('./CategoryRoute'));


module.exports = routes;