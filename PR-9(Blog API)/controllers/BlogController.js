const BlogModel = require('../models/BlogModel');

const addBlog = async (req,res) => {
    try {
        const {title,description} = req.body;

        if(!title || !description || !req.file){
            return res.status(400).send({
                success : false,
                message : "all filed is required",
            })
        }

        const blog =await BlogModel.create({
            userid : req.user._id,
            title : title,
            description : description,
            image : req.file.path,
        })
        return res.status(200).send({
            success : true,
            message : "Blog successfully create",
            blog
        })    
    } catch (err) {
        return res.status(501).send({  
            success : false,
            err : err
        })
    }
}

const viewBlog = async(req,res) => {
    try{
        const blogs = await BlogModel.find({userid:req.user._id}).populate('userid')
        return res.status(200).send({
            success : true,
            message : "Blog successfully fetch",
            blogs
        })
    }catch(err){
        return res.status(501).send({  
            success : false,
            err : err
        })
    }
}

const deleteBlog = async (req,res) => {
    try {
        id = req.query.id;
        console.log(id);
        
        await BlogModel.findByIdAndDelete(id);
        return res.status(200).send({
            success : true,
            message : "Blog succesfully deleted!"
        })
        
    } catch (error) {
        console.log(error);
        return false;
    }
}

const updateBlog = async (req, res) => {
    try {
        const id = req.query.id; // Get blog ID from query parameters
        const { title, description } = req.body;

        if (!id) {
            return res.status(400).send({
                success: false,
                message: "Blog ID is required",
            });
        }

        // Build the update data object
        const updateData = {};
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (req.file) updateData.image = req.file.path; // Include image path if provided

        // Find and update the blog
        const updatedBlog = await BlogModel.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedBlog) {
            return res.status(404).send({
                success: false,
                message: "Blog not found",
            });
        }

        return res.status(200).send({
            success: true,
            message: "Blog successfully updated!",
            blog: updatedBlog,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Error updating blog",
            error: error.message,
        });
    }
};


module.exports = {addBlog,viewBlog,deleteBlog,updateBlog}