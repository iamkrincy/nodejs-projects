const express = require('express');

const routes = express.Router();

const { subcategoryPage, addsubCategory, insertSubcategory } = require('../controller/subcategoryController');

const passport = require('passport');

routes.get('/',subcategoryPage);
routes.get('/addsubcategory',addsubCategory);
routes.post('/insertsubcategory',insertSubcategory)

module.exports = routes;