const PostModel = require('../models/PostModel');
const { post } = require('../routes/PostRoutes');

const addPost = async (req,res) => {
    try {
        const {title,description} = req.body;

        if(!title || !description || !req.file){
            return res.status(400).send({
                success : false,
                message : "all filed is required",
            })
        }

        const post =await PostModel.create({
            userid : req.user._id,
            title : title,
            description : description,
            image : req.file.path,
        })
        return res.status(200).send({
            success : true,
            message : "post successfully create",
            post
        })    
    } catch (err) {
        return res.status(501).send({  
            success : false,
            err : err
        })
    }
}

const viewPost = async(req,res) => {
    try{
        const posts = await PostModel.find({userid:req.user._id}).populate('userid')
        return res.status(200).send({
            success : true,
            message : "posts successfully fetch",
            posts
        })
    }catch(err){
        return res.status(501).send({  
            success : false,
            err : err
        })
    }
}

module.exports = {addPost,viewPost}