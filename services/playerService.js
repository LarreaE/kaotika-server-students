
const Player = require('../models/playerModel');
const profileService = require("./profileService");
const Profile = require('../models/profileModel'); 
const Weapon = require('../models/weaponModel');
const Armor = require('../models/armorModel');
const Artifact = require('../models/artifactModel');
const PotionHealing = require('../models/potionHealingModel');
const PotionAntidote = require('../models/potionAntidoteModel');
const PotionEnhancer = require('../models/potionEnhancerModel');


const getAllPlayers = async () => {  
    try
    {
        
        const players = await Player.find().exec();
        console.log(players);
        return players;
    }
    catch (error)
    {
        throw error;
    }
};



const getPlayerByEmail = async (email) => { 
    try
    {
        const player = await Player.find({email}).exec();  
        if (player.length === 0)   
        {
            //Obtenemos todas las clases y devolvemos el array con ellas
            const profiles = await profileService.getAllProfiles();
            return { player, profiles };
        }

        return {player};
    }
    catch (error) 
    {
        throw error;
    }
};

const getOnePlayer = async (playerId) => { 
    try 
    {
        console.log(playerId);
        const player = await Player.findById(playerId);  
        return player;
    } 
    catch (error) 
    {
        throw error;
    }
};

const createNewPlayer = async (newPlayer) => {
    try 
    {
        
        let playerToInsert = new Player(newPlayer);
        const createdPlayer = await playerToInsert.save();   

        //console.log("Created and saved player");
        //console.log(createdPlayer);

        const completePlayer = populatePlayer(createdPlayer);


        return createdPlayer;
    } 
    catch (error) 
    {
        throw error;
    }
};


const populatePlayer = async (createdPlayer) => {

    console.log("populateFunction");
    const playerCreated = await Player.findById(createdPlayer._id);
    await playerCreated.equipment.populate
    console.log(playerCreated);
}


const updateOnePlayer = async (playerId, changes) => {
    try 
    {
        let updatedPlayer = await Player.findByIdAndUpdate(playerId,{$set:changes},{new:true});
        return updatedPlayer;       
    } 
    catch (error) 
    {
        throw error;
    }
};


module.exports = {
  getAllPlayers,
  getPlayerByEmail,
  getOnePlayer,
  createNewPlayer,
  updateOnePlayer
};