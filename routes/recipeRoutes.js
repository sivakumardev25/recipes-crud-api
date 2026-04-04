const express = require("express");
//create a router
const router = express.Router();

//import the controller functions

const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
} = require("../controllers/recipeController");

//define the routes
//post method to create a new recipe
router.post("/recipes", createRecipe);

//get method to fetch all recipes
router.get("/recipes", getAllRecipes);

//get method to fetch a single recipe by ID
router.get("/recipes/:id", getRecipeById);

//put method to update a recipe by ID
router.put("/recipes/:id", updateRecipeById);

//delete method to delete a recipe by ID
router.delete("/recipes/:id", deleteRecipeById);

//export the router
module.exports = router;
