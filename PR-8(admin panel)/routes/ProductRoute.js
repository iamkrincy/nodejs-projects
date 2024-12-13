const express = require('express');

const path = require('path');

const routes = express.Router();

const {  addProductPage, productPage, addProduct, deleteProduct, ajaxCategory, ajaxsubcategory, changeStatus, editProduct, updateProduct,} = require('../controller/ProductController');

const multer = require('multer');

const st = multer.diskStorage({
  destination:(req,res,cb)=>{
      cb(null,"uploads")
  },
  filename:(req,file,cb)=>{
      const uniq = Math.floor(Math.random() * 100000);
      cb(null,`${file.fieldname}-${uniq}`)
  }
})

const fileUpload = multer({storage:st}).single("image");

routes.get('/',productPage)
routes.get('/addproductpage',addProductPage)
routes.post('/addproduct',fileUpload,addProduct)
routes.get('/deleteproduct',deleteProduct)
routes.get('/ajaxGetcategory',ajaxCategory);
routes.get('/ajaxGetsubcategory',ajaxsubcategory);
routes.get('/changeStatus',changeStatus);
routes.get('/editproduct',editProduct);
routes.post('/updateproduct',updateProduct);


module.exports = routes;