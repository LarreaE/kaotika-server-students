// Cargamos el módulo de mongoose
const mongoose =  require('mongoose');
const Profile = require('./profileModel');

// Usaremos los esquemas
const { Schema } = mongoose;

// Creamos el objeto del esquema y sus atributos
const weaponSchema = new Schema({
   name: String,
   description: String,
   type: String,
   image: String,
   damage: String,
   base_percentage: Number,
   modifiers: [{attribute: String, value: Number}],
   min_level: Number,
   profiles: [{type: Schema.Types.ObjectId, ref: "Profile"}]

});

// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model('Weapon', weaponSchema);

