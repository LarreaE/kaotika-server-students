// Cargamos el módulo de mongoose
const mongoose =  require('mongoose');

// Usaremos los esquemas
const { Schema } = mongoose;

// Creamos el objeto del esquema y sus atributos
const profileSchema = new Schema({
   name: String,
   description: String,
   attributes: [{name: String, value: Number}]
    
   

});

// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model('Profile', profileSchema);