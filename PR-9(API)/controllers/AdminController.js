const PostModel = require('../models/PostModel');
const { post } = require('../routes/PostRoutes');

const allPost = async(req,res) => {
    try {

        const posts = await PostModel.find({}).populate('userid');
        return res.status(200).send({
            success : true,
            message : "post succesfully get!",
            posts
        })
        
    } catch (err) {
        return res.status(501).send({ 
            success : false,
            err : err
        })
    }
}

module.exports = allPost