// Cargamos el módulo de mongoose
const mongoose =  require('mongoose');
const Profile = require('./profileModel');

// Usaremos los esquemas
const { Schema } = mongoose;

// Creamos el objeto del esquema y sus atributos
const armorSchema = new Schema({
   name: String,
   description: String,
   type: String,
   image: String,
   modifiers: [{attribute: String, value: Number}],
   min_attr: [{name: String, value: Number}],
   profiles: [{type: Schema.Types.ObjectId, ref: "Profile"}]

});

// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model('Armor', armorSchema);

