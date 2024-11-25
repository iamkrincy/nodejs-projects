const UserModel = require('../models/UserModel');
const RecipeModel = require('../models/RecipeModel');

const loginPage = (req, res) => {
    if (res.locals.users) {
        return res.redirect('dashboard')
    }
    return res.render('login')
}
const loginUser = (req, res) => {
    return res.redirect('dashboard')
}
const dashboardPage = (req, res) => {
    return res.render('dashboard')
}
const registerPage = (req, res) => {
    return res.render('register')
}
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        await UserModel.create({
            name: name,
            email: email,
            password: password
        })
        console.log("user successfully create");
        return res.redirect('/');
    } catch (err) {
        console.log(err);
        return false;

    }
}
const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
            return false;
        }
        return res.redirect('/');
    });
}

// In controllers/authController.js
const getRecipe = (req, res) => {
    const recipeId = req.params.recipeId;

    // Example recipe data (you might want to fetch this from a database)
    const recipes = {
        pasta: {
            title: "How To Cook Pasta?",
            ingredients: ["Pasta", "Water", "Salt", "Olive Oil"],
            instructions: [
                "Boil water in a pot.",
                "Add salt to the boiling water.",
                "Add pasta and cook for 8-10 minutes.",
                "Drain and serve with sauce."
            ],
            image: "../images/pasta.jpg"
        },

        Manchurian: {
            title: "How To Cook Manchurian?",
            ingredients: ["Water", "Salt", "Olive Oil"],
            instructions: [
                "Boil water in a pot.",
                "Add salt to the boiling water.",
                "Add Manchurian stuffing and cook for 8-10 minutes.",
                "Drain and serve with sauce."
            ],
            image: "../images/mn.jfif"
        },

        Halwa: {
            title: "How To Cook Halwa?",
            ingredients: ["Rava", "Water", "Salt", "Olive Oil"],
            instructions: [
                "Boil water in a pot.",
                "Add salt to the boiling water.",
                "Add Rava and cook for 8-10 minutes.",
                "Drain and serve with Ghee."
            ],
            image: "../images/hl.jpg"
        },

        Dessert: {
            title: "How To Cook Dessert?",
            ingredients: ["All Dessert", "Water", "Salt", "Olive Oil"],
            instructions: [
                "Boil water in a pot.",
                "Add salt to the boiling water.",
                "Add Coco powder and cook for 8-10 minutes.",
                "Drain and serve with Chocalate."
            ],
            image: "../images/de.jpeg"
        },

        Ekadashi: {
            title: "How To Cook SabuDana Khichdi?",
            ingredients: ["Sabudana", "Water", "Salt", "Olive Oil"],
            instructions: [
                "Boil water in a pot.",
                "Add salt to the boiling water.",
                "Add Sabudana and cook for 8-10 minutes.",
                "Drain and serve with sauce."
            ],
            image: "../images/khi.avif"
        },

        Faluda: {
            title: "How To Cook Faluda?",
            ingredients: ["Milk", "Water", "Salt", "Olive Oil"],
            instructions: [
                "Boil water in a pot.",
                "Add salt to the boiling water.",
                "Add Milk and cook for 8-10 minutes.",
                "Drain and serve with kismis."
            ],
            image: "../images/faluda.jfif"
        },
        // Add other recipes here...
    };

    const recipe = recipes[recipeId];

    if (!recipe) {
        return res.status(404).send("Recipe not found");
    }

    res.render('recipe', { recipe });
};

// Add a new recipe
const add = (req, res) => {
    return res.render('addRecipe'); // Render the add recipe page
};

const createRecipe = async (req, res) => {
    const { title, ingredients, instructions } = req.body;
    const image = req.file ? req.file.path : ''; // Get the image path if uploaded

    // Validate required fields
    if (!title || !ingredients || !instructions || !image) {
        return res.status(400).send("All fields are required, including the image.");
    }

    try {
        await RecipeModel.create({
            title,
            ingredients: ingredients.split(',').map(item => item.trim()),
            instructions: instructions.split(',').map(item => item.trim()),
            image
        });
        console.log("Recipe added successfully");
        return res.redirect('/viewRecipes');
    } catch (error) {
        console.error("Error creating recipe:", error);
        return res.status(500).send("Error creating recipe");
    }
};

// View all recipes
const viewRecipes = async (req, res) => {
    try {
        const recipes = await RecipeModel.find(); // Fetch all recipes from the database
        res.render('view', { recipes }); // Pass the recipes to the view
    } catch (error) {
        console.error("Error fetching recipes:", error);
        return res.status(500).send("Error fetching recipes");
    }
};

// Delete a recipe
const deleteRecipe = async (req, res) => {
    const { recipeId } = req.query; // Use recipeId from the query parameters
    try {
        await RecipeModel.findByIdAndDelete(recipeId);
        console.log("Recipe deleted successfully");
        return res.redirect('/viewRecipes'); // Redirect to the view recipes page
    } catch (error) {
        console.error("Error deleting recipe:", error);
        return res.status(500).send("Error deleting recipe");
    }
};

// Edit a recipe
const editRecipe = async (req, res) => {
    const { recipeId } = req.query; // Ensure you are using recipeId from the query parameters
    if (!recipeId) {
        return res.status(400).send("Recipe ID is required");
    }
    
    try {
        const recipe = await RecipeModel.findById(recipeId); // Fetch the recipe by ID
        if (!recipe) {
            return res.status(404).send("Recipe not found");
        }
        return res.render('edit', { recipe }); // Render the edit page with the recipe data
    } catch (error) {
        console.error("Error fetching recipe for edit:", error);
        return res.status(500).send("Error fetching recipe");
    }
};

const updateRecipe = async (req, res) => {
    const { recipeId } = req.params; // Get recipeId from URL parameters
    const { title, ingredients, instructions } = req.body;

    const updateData = {
        title,
        ingredients: ingredients.split(',').map(item => item.trim()),
        instructions: instructions.split(',').map(item => item.trim())
    };

    // Check if a new file was uploaded
    if (req.file) {
        updateData.image = req.file.path; // Update image if a new one was uploaded
    }

    try {
        const updatedRecipe = await RecipeModel.findByIdAndUpdate(recipeId, updateData, { new: true });
        if (!updatedRecipe) {
            return res.status(404).send("Recipe not found");
        }
        console.log("Recipe updated successfully");
        return res.redirect('/viewRecipes'); // Redirect to the view recipes page
    } catch (error) {
        console.error("Error updating recipe:", error);
        return res.status(500).send("Error updating recipe");
    }
};

module.exports = {
    loginPage, loginUser, dashboardPage, registerUser, registerPage, logout , getRecipe , add , createRecipe , viewRecipes , deleteRecipe , editRecipe , updateRecipe
}