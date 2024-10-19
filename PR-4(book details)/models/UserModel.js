const  mongoose = require('mongoose');

const userSchema = mongoose.Schema ({
    name:{
        type : String,
        require: true,
    },
    
    price:{
        type : Number,
        require : true,
    },

    pages:{
        type : String,
        require : true,
    },

    author:{
        type : String,
        require : true,
    }
});
const User = mongoose.model('User', userSchema);

module.exports = User;