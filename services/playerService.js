
const Player = require('../models/playerModel');
const profileService = require("./profileService");
const {Roll} = require('./../classes/roll');
const {PercentileBar} = require('../classes/percentileBar');
const {GoldManager} = require('../classes/goldManager');


// const Profile = require('../models/profileModel'); 
//const Weapon = require('../models/weaponModel');
// const Armor = require('../models/armorModel');
// const Artifact = require('../models/artifactModel');
// const PotionHealing = require('../models/potionHealingModel');
// const PotionAntidote = require('../models/potionAntidoteModel');
// const PotionEnhancer = require('../models/potionEnhancerModel');


const getAllPlayers = async () => {  
    try
    {
        
        const players = await Player.find().exec();
        //console.log(players);
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


    const playerPopulated = await Player.findById(createdPlayer._id).populate('profile').exec();

    //Poblamos el equipo
    await playerPopulated.equipment.populate('armor', {'profiles': 0});
    await playerPopulated.equipment.populate('weapon', {'profiles': 0});
    await playerPopulated.equipment.populate('artifact', {'profiles': 0});
    await playerPopulated.equipment.populate('healing_potion', {'profiles': 0});
    await playerPopulated.equipment.populate('antidote_potion', {'profiles': 0});
    await playerPopulated.equipment.populate('enhancer_potion', {'profiles': 0});
    await playerPopulated.equipment.antidote_potion.populate('recovery_effect');
    await playerPopulated.equipment.populate('ring', {'profiles': 0});
    await playerPopulated.equipment.populate('helmet', {'profiles': 0});
    await playerPopulated.equipment.populate('shield', {'profiles': 0});
    await playerPopulated.equipment.populate('boot', {'profiles': 0});

    
    //Poblamos el inventario
    await playerPopulated.inventory.populate('helmets', {'profiles': 0});
    await playerPopulated.inventory.populate('shields', {'profiles': 0});
    await playerPopulated.inventory.populate('weapons', {'profiles': 0});
    await playerPopulated.inventory.populate('boots', {'profiles': 0});
    await playerPopulated.inventory.populate('rings', {'profiles': 0});
    await playerPopulated.inventory.populate('armors', {'profiles': 0});
    await playerPopulated.inventory.populate('artifacts', {'profiles': 0});
    await playerPopulated.equipment.populate('healing_potions', {'profiles': 0});
    await playerPopulated.equipment.populate('antidote_potions', {'profiles': 0});
    await playerPopulated.equipment.populate('enhancer_potions', {'profiles': 0});

    
    


    

    
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


const updateTask = async (tasks) => {
    try 
    {
        console.log("updateTask called succesfully");
        console.log("Tasks:");
        console.log(tasks);

        const allPlayers = await Player.find().exec();

        const updatedPlayerIds = [];

        for (let player of allPlayers)
        {
            //Filtramos las tareas que tienen el id del player en curso
            let tasksToUpdate = tasks.filter( task => player.classroom_Id === task.classroomId );
            console.log("Tasks to Update");
            console.log(tasksToUpdate);
            if (tasksToUpdate.length !== 0)
            {
                //await Player.updateOne({classroom_Id: player.classroom_Id}, {tasks: [...player.tasks, ...tasksToUpdate]}).exec().then(result => {
                   // console.log(result);
                    // updatedPlayerIds.push(player.classroom_Id);


                checkIfLevelUpAndUpdatePlayer(player);
                
                // }).catch(error => {
                //     console.error(error);
                // });    
            }       
        }

        console.log("Player service. Updated player ID list");
        console.log(updatedPlayerIds);
            
        return updatedPlayerIds;       
    } 
    catch (error) 
    {
        throw error;
    }
}

const checkIfLevelUpAndUpdatePlayer = (player) => {
    
    const isLevelUp = true;
    if (isLevelUp)
    {
        //updateLevelAndExperience();
        updateGold(player);
    }
    
    

}

const updateGold = (player) => {

    //Calculate gold quantity when level ups one unit
    console.log("Enters updateGold")


    

    //Create percentileBar with Charisma prob
    const charisma = player.attributes.charisma;

    const percentileBar = PercentileBar.create20CriticalAndFumble(charisma);

    console.log(`Percentile Bar`);
    console.log(percentileBar);

    //Throw 1D100
    const d100 = new Roll(100, 1, 0);
    const d100roll = d100.execute();
    console.log(d100roll);

    const typeOfRoll = percentileBar.getTypeOfRoll(d100roll);
    console.log("Type of Roll: " + typeOfRoll);

    const dieRollMap = new Map();

    const roll0 = new Roll(4, 1, -1);
    const roll1 = new Roll(20, 1, 0);
    const roll2 = new Roll(48, 1, +2);
    const roll3 = new Roll(60, 1, +20);
    const roll4 = new Roll(100, 1, +60);
    const roll5 = new Roll(200, 1, +70);



    dieRollMap.set(PercentileBar.Value.FUMBLE,      roll0);//1D4-1 (-1, 3)
    dieRollMap.set(PercentileBar.Value.FAIL,        roll1);   //1D12 (1, 20)
    dieRollMap.set(PercentileBar.Value.SUCCESS,     roll2);   //1D48+2 (6, 50)
    dieRollMap.set(PercentileBar.Value.GREAT,       roll3);  //1D60+20 (23, 80)
    dieRollMap.set(PercentileBar.Value.CRITICAL,    roll4);   //1D100+60 (61, 160)
    dieRollMap.set(PercentileBar.Value.PERFECT,     roll5);   //1D200+70 (72, 270)

    const goldManager = GoldManager.create(dieRollMap);

   
    const gold = goldManager.calculateGold(player.level, 1);
    
    console.log("Gold obtained")
    console.log(gold);


}


module.exports = {
  getAllPlayers,
  getPlayerByEmail,
  getOnePlayer,
  createNewPlayer,
  updateOnePlayer,
  updateTask
};
