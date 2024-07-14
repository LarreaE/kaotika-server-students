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
   value: Number,
   damage: String,
   base_percentage: Number,
   modifiers: {
      intelligence: Number,
      dexterity: Number,
      constitution: Number,
      insanity: Number,
      charisma: Number,
      strength: Number
    },
   min_level: Number,
   profiles: [{type: Schema.Types.ObjectId, ref: "Profile"}]

});

// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model('Weapon', weaponSchema);

