//import the express module
const express = require("express");

//create the app
const app = express();

//import the .env file
require("dotenv").config();

//middleware to parse JSON
app.use(express.json());

//import the database connection function
const connectDB = require("./config/db");

//connect to the database
connectDB();

const router = express.Router();

//import the recipe routes
const recipeRoutes = require("./routes/recipeRoutes");

//use the recipe routes
app.use("/api", recipeRoutes);

//start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = app;
