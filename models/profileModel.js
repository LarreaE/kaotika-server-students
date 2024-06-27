// Cargamos el módulo de mongoose
const mongoose =  require('mongoose');

// Usaremos los esquemas
const { Schema } = mongoose;

const AttributesSchema = new Schema({name: String, value: Number});

// Creamos el objeto del esquema y sus atributos
const profileSchema = new Schema({
   name: String,
   description: String,
   attributes: [AttributesSchema]
    
   

});

// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model('Profile', profileSchema);