const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
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

const blog = mongoose.model('blog',blogSchema);
module.exports = blog;