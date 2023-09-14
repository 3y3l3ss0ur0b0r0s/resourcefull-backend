const mongoose = require("mongoose");

const ingredientSchema = mongoose.Schema({
    defaultUnit: String
});

module.exports = mongoose.model("Ingredient", ingredientSchema);