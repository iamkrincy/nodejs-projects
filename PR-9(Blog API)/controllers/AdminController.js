const BlogModel = require('../models/BlogModel');

const allBlogshow = async(req,res) => {
    try {

        const blogs = await BlogModel.find({}).populate('userid');
        return res.status(200).send({
            success : true,
            message : "Blog succesfully get!",
            blogs
        })
        
    } catch (err) {
        return res.status(501).send({ 
            success : false,
            err : err
        })
    }
}

module.exports = allBlogshow