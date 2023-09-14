const express = require("express");
const router = express.Router();
const {
    getRecipes,
    getRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe
} = require("../controllers/recipeController");
const validateToken = require("../middleware/validateTokenHandler"); // For private routes

router.route('/').get(getRecipes).post(createRecipe, validateToken);

router.route('/:id').get(getRecipe).put(updateRecipe, validateToken).delete(deleteRecipe, validateToken);

module.exports = router;