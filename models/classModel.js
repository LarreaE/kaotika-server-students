// Cargamos el módulo de mongoose
const mongoose =  require('mongoose');

// Usaremos los esquemas
const { Schema } = mongoose;

// Creamos el objeto del esquema y sus atributos
const classSchema = new Schema({
   name: String,
   description: String,
   attributes: {
        int: Number,
        str: Number,
        dex: Number,
        con: Number
   }
    
   

});

// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model('Class', classSchema);