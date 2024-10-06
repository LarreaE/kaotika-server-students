// Cargamos el módulo de mongoose
const mongoose =  require('mongoose');

// Usaremos los esquemas
const { Schema } = mongoose;

// Creamos el objeto del esquema y sus atributos
const ingredientSchema = new Schema({
   name: String,
   description: String,
   type: String,
   value: Number,
   image: String,
   effects: [String]
  
   

});

// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model('Ingredient', ingredientSchema);

