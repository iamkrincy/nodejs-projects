// const PostModel = require('../models/PostModel');
// const UserModel = require('../models/UserModel');
// const CommentModel = require('../models/CommentModel');

// const addComment = async(req,res) => {
//     try {
//         const {comments} = req.body;

       

//         const post =await CommentModel.create({
//             userid : req.user._id,
//             postid : req.user._id,
//             comments : comments,
//         })
//         return res.status(200).send({
//             success : true,
//             message : "comments successfully create",
//             post
//         })    
        
//     } catch (err) {
//         return res.status(501).send({ 
//             success : false,
//             err : err
//         })
//     }

// }

// module.exports = addComment

const CommentModel = require('../models/CommentModel');
const UserModel = require('../models/UserModel');

const addComment = async (req, res) => {
    try {
        const { comments, postid } = req.body;

        // Create a new comment in the database
        const newComment = await CommentModel.create({
            userid: req.user._id, // Assuming req.user._id contains the authenticated user ID
            postid: postid,        // Make sure postid is passed in the request body
            comments: comments
        });

        // Return the comment details (with only the fields you need, like comment and associated IDs)
        return res.status(200).send({
            success: true,
            message: "Comment successfully created",
            comment
        });
        
    } catch (err) {
        return res.status(501).send({
            success: false,
            message: err.message || "Server error"
        });
    }
};

module.exports = addComment;
