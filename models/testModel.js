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

// Creamos el objeto del esquema y sus atributos
const equipmentSchema = new Schema({
   name: String,
   type: String,
   image: String,
   effect: {
    attribute: String,
    value: Number
   },
   profiles: [{type: Schema.Types.ObjectId, ref: "Profile"}]

});

// Exportamos el modelo para usarlo en otros ficheros

const Equipment = mongoose.model('Equipment', equipmentSchema);
const Profile1  = mongoose.model('Profile', profileSchema);
   
module.exports = {
   //Equipment,
  // Profile
}

