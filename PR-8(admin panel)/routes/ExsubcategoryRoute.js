const express = require('express');

const routes = express.Router();

const {  addexsubcategoryPage, viewexsubcategoryPage,insertExsubcategory,ajaxCategory,deleteExsubcategory,editExsubcategory, changeStatus, updateExsubCategory} = require('../controller/ExsubcategoryController');

routes.get('/',viewexsubcategoryPage);
routes.get('/addexsubcategorypage',addexsubcategoryPage);
routes.post('/insertexsubcategory',insertExsubcategory);
routes.get('/ajaxGetcategory',ajaxCategory);
routes.get('/deleteexsubcategory',deleteExsubcategory);
routes.get('/editexsubcategory',editExsubcategory);
routes.post('/updateexsubcategory',updateExsubCategory);
routes.get('/changestatus',changeStatus);

module.exports = routes;