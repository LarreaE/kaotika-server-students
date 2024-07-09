// Cargamos el módulo de mongoose
const mongoose =  require('mongoose');

// Usaremos los esquemas
const { Schema } = mongoose;

// Creamos el objeto del esquema y sus atributos


const playerSchema = new Schema({
   name: String,
   email: String,
   avatar: String,
   level: {type: Number, default: 1},
   experience: {type: Number, default: 0},
   is_active: {type: Boolean, default: true},
   profile: {type: Schema.Types.ObjectId,    ref: "Profile"},
   equipment: {armor: {type: Schema.Types.ObjectId, ref: "Armor"},
               weapon: {type: Schema.Types.ObjectId, ref: "Weapon"},
               artifact: {type: Schema.Types.ObjectId, ref: "Artifact"},
               antidote_potion: {type: Schema.Types.ObjectId, ref: "PotionAntidote"},
               healing_potion: {type: Schema.Types.ObjectId, ref: "PotionHealing"},
               enhancer_potion: {type: Schema.Types.ObjectId, ref: "PotionEnhancer"}
               },
            

   inventory: {type: Array, default: null},
   tasks: { type:[String], default: null },
   created_date: { type: Date, default: Date.now },
   gold: {type: Number, default:50}


});


// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model('Player', playerSchema);