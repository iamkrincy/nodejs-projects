const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db'); // Import the database connection
const Recipe = require('./models/RecipeModel'); // Import the Recipe model

const app = express();

// Connect to MongoDB
connectDB(); // Call the function to connect to the database

// Middleware
app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Route to add a recipe
app.post('/add-recipe', async (req, res) => {
    const { title, ingredients, instructions } = req.body;

    const newRecipe = new Recipe({
        title,
        ingredients,
        instructions
    });

    try {
        await newRecipe.save(); // Save the recipe to the database
        res.status(201).send('Recipe added successfully!');
    } catch (error) {
        console.error("Error adding recipe:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Route to view recipes
app.get('/view-recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find(); // Fetch all recipes from the database
        res.json(recipes); // Respond with the list of recipes
    } catch (error) {
        console.error("Error fetching recipes:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});