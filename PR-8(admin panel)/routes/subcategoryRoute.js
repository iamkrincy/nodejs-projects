const express = require('express');

const routes = express.Router();

const { subcategoryPage, addsubCategory, insertSubcategory } = require('../controller/subcategoryController');

const passport = require('passport');

routes.get('/',passport.checkUser,subcategoryPage);
routes.get('/addsubcategory',passport.checkUser,addsubCategory);
routes.post('/insertsubcategory',insertSubcategory)

module.exports = routes;