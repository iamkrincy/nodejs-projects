const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    category_name : {
        type : String,
        required : true,
    },
})
const category = mongoose.model('category',CategorySchema);
module.exports = category;