const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    userid:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
    },
    postid:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "post",
    },
    comments:{
        type : String,
        require : true,
    },
});

const comment = mongoose.model('comment',commentSchema);
module.exports = comment;