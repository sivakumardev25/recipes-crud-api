const Recipe = require("../models/recipeModel");

//Create a new recipe

exports.createRecipe = async (req, res) => {
  try {
    //create the data from the request body
    const { name, ingredients, instructions, cookingTime } = req.body;

    //validation
    if (!name || !ingredients || !instructions || !cookingTime === undefined) {
      return res.status(400).json({
        success: false,
        message: "Name, ingredients, instructions and cookingTime are required",
      });
    }

    // Check if user already exists
    const existingRecipe = await Recipe.findOne({ name });
    if (existingRecipe) {
      return res.status(400).json({ message: "Item already exists" });
    }
    //create a new recipe
    const newRecipe = await Recipe.create({
      name,
      ingredients,
      instructions,
      cookingTime,
    });

    //send the response
    res.status(201).json({
      success: true,
      recipe: newRecipe,
      message: "New Recipe created successfully",
    });
  } catch (error) {
    console.error("Error creating recipe:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Get all recipes
exports.getAllRecipes = async (req, res) => {
  //get all recipes from the database
  try {
    const recipes = await Recipe.find();
    res.status(200).json({
      success: true,
      count: recipes.length,
      message: "All recipes fetched successfully",
      data: recipes,
    });
  } catch (error) {
    console.error("Error fetching recipes:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Get a single recipe by ID
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }
    res.status(200).json({
      success: true,
      data: recipe,
    });
  } catch (error) {
    console.error("Error fetching recipe:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Update a recipe by ID
exports.updateRecipeById = async (req, res) => {
  try {
    // find the recipe by ID and update it with the new data from the request body
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // if the recipe is not found
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    // send the response with the updated recipe
    res.status(200).json({
      success: true,
      message: "Recipe updated successfully",
      data: recipe,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Delete a recipe by ID
exports.deleteRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Recipe deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
