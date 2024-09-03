
const Player = require('../models/playerModel');
const profileService = require("./profileService");
// const Profile = require('../models/profileModel'); 
// const Weapon = require('../models/weaponModel');
// const Armor = require('../models/armorModel');
// const Artifact = require('../models/artifactModel');
// const PotionHealing = require('../models/potionHealingModel');
// const PotionAntidote = require('../models/potionAntidoteModel');
// const PotionEnhancer = require('../models/potionEnhancerModel');


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

        //console.log("Entra");
        const player = await Player.find({email}).exec();  
        if (player.length === 0)   
        {
            //Obtenemos todas las clases y devolvemos el array con ellas
            const profiles = await profileService.getAllProfiles();
            return { message: "NO PLAYER", profiles };
        }

        //console.log(player);
        const createdPlayer = await populatePlayer(player[0]);
        //console.log(createdPlayer);

        //console.log("Devolvemos player creado populado")
        return { message: "PLAYER OK", createdPlayer };
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
        const profile = await profileService.getProfileById(newPlayer.profile);


        const attributes = {
            intelligence:   profile.attributes[0].value,
            dexterity:      profile.attributes[1].value,
            insanity:       profile.attributes[2].value,
            charisma:       profile.attributes[3].value,
            constitution:   profile.attributes[4].value,
            strength:       profile.attributes[5].value

        }

        newPlayer = {...newPlayer, attributes: attributes};
        let playerToInsert = new Player(newPlayer);


        console.log(playerToInsert);

        const createdPlayer = await playerToInsert.save(); 

        

        return createdPlayer;
    } 
    catch (error) 
    {
        throw error;
    }
};


const populatePlayer = async (createdPlayer) => {



    console.log("populateFunction");
    const playerPopulated = await Player.findById(createdPlayer._id).populate('profile').exec();
    console.log(playerPopulated);

    await playerPopulated.equipment.populate('armor', {'profiles': 0});
    await playerPopulated.equipment.populate('weapon', {'profiles': 0});
    await playerPopulated.equipment.populate('artifact', {'profiles': 0});
    await playerPopulated.equipment.populate('healing_potion', {'profiles': 0});
    await playerPopulated.equipment.populate('antidote_potion', {'profiles': 0});
    await playerPopulated.equipment.populate('enhancer_potion', {'profiles': 0});
    await playerPopulated.equipment.antidote_potion.populate('recovery_effect');

    
    //console.log(playerCreated);
    //console.log("PLAYER DATA AFTER ARMOR POPULATION")
    //console.log(playerPopulated);

    return playerPopulated;
    
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