
const ingredientService = require("../services/ingredientService");

const getAllingredients = async (req, res) => {
  try {
    const allingredients = await ingredientService.getAllIngredients();
    
    if (!allingredients) {
        res.status(404).send({message: 'No existen ingredientes'});
    }
    res.send({ status: "OK", data: allingredients });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", 
              message: "Error al realizar la petición:",
              data: { error: error?.message || error } });
  }
};



module.exports = {
    getAllingredients
}