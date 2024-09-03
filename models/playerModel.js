// Cargamos el módulo de mongoose
const mongoose =  require('mongoose');

// Usaremos los esquemas
const { Schema } = mongoose;

// Creamos el objeto del esquema y sus atributos


const playerSchema = new Schema({
  name: String,
  nickname: String, 
  email: String,
  avatar: String,
  level: {type: Number, default: 1},
  experience: {type: Number, default: 0},
  is_active: {type: Boolean, default: true},
  profile: {type: Schema.Types.ObjectId, ref: "Profile"},
  attributes: {
    intelligence: Number,
    dexterity: Number,
    insanity: Number,
    charisma: Number,
    constitution: Number,
    strength: Number
  },
  equipment: {
    helmet: {type: Schema.Types.ObjectId, ref: "Helmet", default: null}, 
    weapon: {type: Schema.Types.ObjectId, ref: "Weapon"},
    armor: {type: Schema.Types.ObjectId, ref: "Armor"},
    shield: {type: Schema.Types.ObjectId, ref: "Shield", default: null},
    artifact: {type: Schema.Types.ObjectId, ref: "Artifact"},
    boot: {type: Schema.Types.ObjectId, ref: "Boot", default: null},
    ring: {type: Schema.Types.ObjectId, ref: "Ring", default: null},
    antidote_potion: {type: Schema.Types.ObjectId, ref: "PotionAntidote"},
    healing_potion: {type: Schema.Types.ObjectId, ref: "PotionHealing"},
    enhancer_potion: {type: Schema.Types.ObjectId, ref: "PotionEnhancer"}
    },
  inventory: {
    helmets: [{type: Schema.Types.ObjectId, ref: "Helmet"}],
    weapons: [{type: Schema.Types.ObjectId, ref: "Weapon"}],
    armors: [{type: Schema.Types.ObjectId, ref: "Armor"}],
    shields: [{type: Schema.Types.ObjectId, ref: "Shield"}],
    artifacts: [{type: Schema.Types.ObjectId, ref: "Artifact"}],
    boots: [{type: Schema.Types.ObjectId, ref: "Boot"}],
    rings: [{type: Schema.Types.ObjectId, ref: "Ring"}],
    antidote_potions: [{type: Schema.Types.ObjectId, ref: "PotionAntidote"}],
    healing_potions: [{type: Schema.Types.ObjectId, ref: "PotionHealing"}],
    enhancer_potions: [{type: Schema.Types.ObjectId, ref: "PotionEnhancer"}]
  },
  tasks: [{ type:[String], default: null }],
  created_date: { type: Date, default: Date.now },
  gold: {type: Number, default:50}
});

// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model('Player', playerSchema);
