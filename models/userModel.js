const mongoose = require("mongoose");
const Ingredient = require("../models/ingredientModel");
const Recipe = require("../models/recipeModel");

// Debating whether we should have createdRecipes: [mongoose.Schema.Types.ObjectId]

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please provide a username."]
        },
        email: {
            type: String,
            required: [true, "Please provide a user email address."],
            unique: [true, "Email is already in use."]
        },
        password: {
            type: String,
            required: [true, "Please provide a user password."]
        },
        ingredients: [
            {
                ingredient: {
                    type: [mongoose.Schema.Types.ObjectId], 
                    ref: 'Ingredient', 
                    required: [true, "Please provide recipe ingredients."],
                    unique: [true, "Duplicate ingredient(s) found."]
                },
                originalUnit: String,
                originalQuantity: Number,
                convertedUnit: String,
                convertedQuantity: Number
            }
        ],
        starredRecipes: [mongoose.Schema.Types.ObjectId]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);