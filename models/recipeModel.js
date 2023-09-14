const mongoose = require("mongoose");
const Ingredient = require("../models/ingredientModel");

// All ingredient quantities are based on the default unit; separate function is needed to ensure conversion to and from that unit when creating and displaying the recipe

const recipeSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        name: {
            type: String,
            required: [true, "Please provide a recipe name."]
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
        ]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Recipe", recipeSchema);