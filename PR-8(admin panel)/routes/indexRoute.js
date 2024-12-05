const express = require('express');

const routes = express.Router();

routes.use('/',require('./AuthRoutes'));
routes.use('/category',require('./CategoryRoute'));
routes.use('/subcategory',require('./subcategoryRoute'));


module.exports = routes;