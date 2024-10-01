// Cargamos el módulo de mongoose
const mongoose =  require('mongoose');

// Usaremos los esquemas
const { Schema } = mongoose;

// Creamos el objeto del esquema y sus atributos
const ringSchema = new Schema({
   name: String,
   description: String,
   type: String,
   image: String,
   isUnique: Boolean,
   isActive: Boolean,
   modifiers: {
      intelligence: Number,
      dexterity: Number,
      constitution: Number,
      insanity: Number,
      charisma: Number,
      strength: Number
    },
   min_lvl: Number,
   profiles: [{type: Schema.Types.ObjectId, ref: "Profile"}]

});

// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model('Ring', ringSchema);