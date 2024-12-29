const CommentModel = require('../models/CommentModel');
const BlogModel = require('../models/BlogModel');

const addComment = async (req, res) => {
    try {
        const { comment, blogid } = req.body;

        // Validate input
        if (!comment || !blogid) {
            return res.status(400).send({
                success: false,
                message: "Comment and blog ID are required",
            });
        }

        // Check if the blog exists
        const blog = await BlogModel.findById(blogid);
        if (!blog) {
            return res.status(404).send({
                success: false,
                message: "Blog not found",
            });
        }

        // Create a new comment
        const newComment = await CommentModel.create({
            userid: req.user._id, // Assuming req.user._id contains the authenticated user ID
            blogid: blogid,
            comment: comment,
        });

        return res.status(200).send({
            success: true,
            message: "Comment successfully created",
            comment: newComment,
        });
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err.message || "Server error",
        });
    }
};

module.exports = addComment;
