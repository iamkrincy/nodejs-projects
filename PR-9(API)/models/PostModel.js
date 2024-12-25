const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userid:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
    },
    title:{
        type : String,
        require : true,
    },
    description:{
        type : String,
        require : true,
    },
    image:{
        type : String,
        require : true,
    },
});

const post = mongoose.model('post',postSchema);
module.exports = post;