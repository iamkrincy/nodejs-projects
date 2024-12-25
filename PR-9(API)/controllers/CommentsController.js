const PostModel = require('../models/PostModel');
const UserModel = require('../models/UserModel');
const CommentModel = require('../models/CommentModel');

const addComment = async(req,res) => {
    try {
        
    } catch (err) {
        return res.status(501).send({ 
            success : false,
            err : err
        })
    }

}

module.exports = addComment