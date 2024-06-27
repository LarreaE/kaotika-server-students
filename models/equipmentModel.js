// Cargamos el módulo de mongoose
const mongoose =  require('mongoose');
const profileModel = require('./profileModel');

// Usaremos los esquemas
const { Schema } = mongoose;

// Creamos el objeto del esquema y sus atributos
const equipmentSchema = new Schema({
   name: String,
   type: String,
   image: String,
   effect: {
    attribute: String,
    value: Number
   },
   profiles: [{type: Schema.Types.ObjectId, ref: "profileModel"}]

});

// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model('Equipment', equipmentSchema);