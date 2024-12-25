const mongoose = require('mongoose');

const userShema = mongoose.Schema({
    name:{
        type : String,
        require : true,
    },
    email:{
        type : String,
        require : true,
    },
    password:{
        type : String,
        require : true,
    },
    city:{
        type : String,
        require : true,
    },
    phone:{
        type :  Number,
        require : true,
    },
    role : {
        type : String,
        default : "user"
    }
});

const user = mongoose.model('user',userShema);
module.exports = user;