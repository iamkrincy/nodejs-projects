const express = require('express');

const routes = express.Router();

const { verifyToken,Admin } = require('../middleware/Auth');

const multer = require('multer');
const { addBlog, viewBlog, deleteBlog, updateBlog } = require('../controllers/BlogController');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage }).single('image')

routes.post('/addblog',verifyToken,upload,addBlog);
routes.get('/viewblog',verifyToken,Admin,viewBlog);
routes.delete('/deleteblog',verifyToken,Admin,deleteBlog);
routes.put('/updateblog' ,verifyToken , Admin,upload, updateBlog);


module.exports = routes;