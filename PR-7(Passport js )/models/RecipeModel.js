const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: [String], required: true },
    image: { type: String, required: true } // Ensure this is included if required
});

const RecipeModel = mongoose.model('Recipe', RecipeSchema);
module.exports = RecipeModel;