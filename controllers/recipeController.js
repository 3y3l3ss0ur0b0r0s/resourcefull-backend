const asyncHandler = require("express-async-handler"); // For error-handling middleware
const Recipe = require("../models/recipeModel"); // So we can use our Recipe model
const convert = require("../middleware/unitConverter"); // For converting ingredient units to and from default units upon creation of recipe and on display respectively

// Labels:
//@desc Get recipes (with or without query string)
//@route GET /api/recipes
//@access public
const getRecipes = asyncHandler(async (req, res) => {
    // Code to search for recipes in database by using query string parameters (req.query.<someVariable>)
    //
    // ***
    //

    const recipes = await Recipe.find();
    res.status(200).json(recipes);
});

// Labels:
//@desc Get single recipe
//@route GET /api/recipes/:id
//@access public
const getRecipe = asyncHandler(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);

    if(!recipe) {
        res.status(404);
        throw new Error("Recipe not found.");
    }

    res.status(200).json(recipe);
});

// Labels:
//@desc Create new recipe
//@route POST /api/recipes
//@access private
const createRecipe = asyncHandler(async (req, res) => {
    console.log("req.body of POST reqeuest to /api/recipes:", req.body);

    // Destructure the request body
    const { name, ingredients, characteristics, url } = req.body;

    // Check for missing values
    if (!name || !ingredients || !characteristics || !url) {
        res.status(400);
        throw new Error("name, ingredients, characteristics, and url are required.");
    }

    // If all required values are provided, create the new recipe using the variables from the destructured request body and the user's id
    const recipe = {
        name,
        ingredients,
        characteristics,
        url,
        user_id: req.user.id
    };
});

// Labels:
//@desc Update recipe
//@route PUT /api/recipes/:id
//@access private
const updateRecipe = asyncHandler(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);

    // Verify recipe exists
    if(!recipe) {
        res.status(404);
        throw new Error("Recipe not found.");
    }

    // Verify the recipe was created by the user making the request
    if(recipe.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User does not have permission to update recipes created by other users.");
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedRecipe); // Upon successful update, return status code 200 and recipe info
});

// Labels:
//@desc Delete recipe
//@route DELETE /api/recipes/:id
//@access private
const deleteRecipe = asyncHandler(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);

    // Verify recipe exists
    if(!recipe) {
        res.status(404);
        throw new Error("Recipe not found.");
    }

    // Verify the recipe was created by the user making the request
    if(recipe.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User does not have permission to delete recipes created by other users.");
    }

    await Recipe.deleteOne({ _id: req.params.id });

    res.status(200).json(recipe); // Upon successful update, return status code 200 and recipe info
});

module.exports = {
    getRecipes,
    getRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe
};