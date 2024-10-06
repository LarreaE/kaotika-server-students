const express = require("express");
const router = express.Router();
const ingredientController = require("../controllers/ingredientController");



router.get("/", ingredientController.getAllingredients);


module.exports = router;