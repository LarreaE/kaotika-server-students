const Ingredient = require('../models/ingredientModel');

const getAllIngredients = async () => {  
    try
    {
        
        const ingredients = await Ingredient.find().exec();
        return ingredients;
    }
    catch (error)
    {
        throw error;
    }
};


module.exports = {
    getAllIngredients
    
  };