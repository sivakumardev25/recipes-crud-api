const mongoose = require("mongoose");

//Schema for recipe

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    cookingTime: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

//Model for recipe
module.exports = mongoose.model("Recipe", recipeSchema);
