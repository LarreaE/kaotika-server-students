// Cargamos el módulo de mongoose
const mongoose =  require('mongoose');
const Profile = require('./profileModel');
const Disease = require('./diseaseModel');

// Usaremos los esquemas
const { Schema } = mongoose;

// Creamos el objeto del esquema y sus atributos
const potionAntidoteSchema = new Schema({
   name: String,
   description: String,
   type: String,
   image: String,
   value: Number,
   recovery_effect: {type: Schema.Types.ObjectId, ref: "Disease"},
   min_attr: [{name: String, value: Number}],
   profiles: [{type: Schema.Types.ObjectId, ref: "Profile"}]

});

// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model('PotionAntidote', potionAntidoteSchema);

