
const Player = require('../models/playerModel');
const profileService = require("./profileService");
const {Roll} = require('./../classes/roll');
const {PercentileBar} = require('../classes/percentileBar');
const {GoldManager} = require('../classes/goldManager');
const {EXPERIENCE_TO_NEXT_LEVEL, EXPERIENCE_PER_GRADE, ATTRIBUTES_INCREASE_PER_LEVEL, LevelUpAttributes, ProfilesAttributes} = require('../classes/constants');
const Armor = require('../models/armorModel');
const Weapon = require('../models/weaponModel');
const Artifact = require('../models/artifactModel');
const Helmet = require('../models/helmetModel');
const Boot = require('../models/bootModel');
const Shield = require('../models/shieldModel');
const Ring = require('../models/ringModel');



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

const getHallOfFame = async () => {  
    try {   
        const players = await Player.find().sort({experience: -1}).exec();
        console.table(players)
        return players;
    } catch (error) {
        throw error;
    }
};

const getPlayerByEmail = async (email) => { 
    try
    {

        //console.log("Entra");
        const player = await Player.findOne({email}).exec(); 
        //console.log(player);
        
        if (player === null)   
        {
            //Obtenemos todas las clases y devolvemos el array con ellas
            const profiles = await profileService.getAllProfiles();
            return { message: "NO PLAYER", profiles };
        }

        //console.log(player);
        //const player = players[0];
        const createdPlayer = await populatePlayer(player._id);
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


const populatePlayer = async (playerId) => {


    const playerPopulated = await Player.findById(playerId).populate('profile').exec();


    // Poblamos el equipo
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

 
    // Poblamos el inventario
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

    return playerPopulated; 
}


const updateOnePlayer = async (playerId, changes) => {
    try 
    {
        const updatedPlayer = await Player.findByIdAndUpdate(playerId,{$set:changes},{new:true});
        const populatedDataPlayer = await populatePlayer(updatedPlayer._id);
        return populatedDataPlayer;       
    } 
    catch (error) 
    {
        throw error;
    }
};

const updateGoldOrExperienceForOnePlayer = async (classroom_Id, changes) => {
    try {
        console.log("UPDATE GOLD | EXPERIENCE SERVICE");
        console.log(`classroom_Id: ${classroom_Id}`);
        console.log(`Gold: ${changes.gold} Experience: ${changes.experience}`);

        const updatedPlayer = await Player.updateOne({classroom_Id: classroom_Id},{$inc:{gold:changes.gold, experience:changes.experience}},{new:true});
        console.log("UPDATED PLAYER SERVICE");
        console.log(updatedPlayer);
        return updatedPlayer;       
    } catch (error) {
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
            // console.log("Tasks to Update");
            // console.log(tasksToUpdate);
            if (tasksToUpdate.length !== 0)
            {
                await Player.updateOne({classroom_Id: player.classroom_Id}, {tasks: [...player.tasks, ...tasksToUpdate]});
                   // console.log(result);
                updatedPlayerIds.push(player.classroom_Id);


                await checkIfLevelUpAndUpdatePlayer(player, tasksToUpdate[0]);
  
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

const checkIfLevelUpAndUpdatePlayer = async (player, task) => {
    
    try
    {
        const newXP = player.experience + task.grade * EXPERIENCE_PER_GRADE;
        const newLevel = Math.floor(newXP / EXPERIENCE_TO_NEXT_LEVEL) + 1;
        const numOfLevelsToAdd = newLevel - player.level;

        console.log("Actual XP");
        console.log(player.experience);
        console.log("New XP");
        console.log(newXP);
        console.log("Num levels to add");
        console.log(numOfLevelsToAdd);

        const isLevelUp = numOfLevelsToAdd > 0;

        if (isLevelUp)
        {
            let newGold = player.gold;
            let inventory = player.inventory;
            let attributes = player.attributes;

            //Actualizamos el oro un número de veces igual a los niveles añadidos.
            for (let i = 0; i < numOfLevelsToAdd; ++i)
            {
        
                const levelToUpdate = player.level + i + 1;
                console.log("Update Gold in level " + levelToUpdate);
                newGold += updateGoldInLevel(player, levelToUpdate);

                //Seleccionamos una pieza del equipamiento aleatoria por nivel
                const randomPiece = await getRandomEquipment(player, levelToUpdate);

                //Actualizamos los atributos del player
                attributes = await updateAttributes(player._id, attributes);
                
                const inventoryType = randomPiece.type + "s";
                const availablePiecesFromType = inventory[inventoryType];

                console.log("Available pieces");
                console.log(availablePiecesFromType);

                //Vamos alimentando el inventario con un nuevo elemento por nivel subido
                inventory = {...inventory, [inventoryType]:[...availablePiecesFromType, randomPiece._id]};

            }

            //Actualizamos los atributos en DB
            await Player.updateOne({classroom_Id: player.classroom_Id}, {attributes});
            
            //Actualizamos el inventario en BD 
            await Player.updateOne({classroom_Id: player.classroom_Id}, {inventory});
                

            console.log(inventory);

            
            //Guardamos el oro en DB
            await Player.updateOne({classroom_Id: player.classroom_Id}, {gold: newGold});

            //Actualizamos nivel en DB
            await Player.updateOne({classroom_Id: player.classroom_Id}, {level: newLevel});

            

        }


        //Actualizamos experiencia
        await Player.updateOne({classroom_Id: player.classroom_Id}, {experience: newXP});




    }
    catch (error) 
    {
        throw error;
    }


    

}

const updateAttributes = async (id, {intelligence, dexterity, charisma, insanity, constitution, strength}) => {
    try{

    
        const playerWithProfile = await Player.findById(id).populate('profile').exec();

        //console.log(playerWithProfile);
        //Calculamos los pesos según el perfil del player
        const majorAndMinorAttributes = ProfilesAttributes.find(profile => profile.name === playerWithProfile.profile.name);
        const majorAttributes = majorAndMinorAttributes.major_attributes;
        const minorAttributes = majorAndMinorAttributes.minor_attributes;
        const normalAttributes = majorAndMinorAttributes.normal_attributes;

        //Asignamos probabilidades a los atributos y devolvemos un array con las mismas
        const attributeChances = assignChanceToAttributes(majorAttributes, minorAttributes, normalAttributes);
        console.log(attributeChances);

        //Creamos un array con las probabilidades acumuladas, comenzando en 0
        //Ej: Dado el array de probabilidades [ 12, 40, 18, 18, 12 ]
        //    Obtendríamos el siguiente:     [ 12, 52, 70, 88, 100 ]
        const chancesAccumulated = attributeChances.map((item, index) => {
            const currentChanceArray = attributeChances.slice(0, index+1);
            return currentChanceArray.reduce((accumulator, current) => accumulator + current, 0);

        });

        console.log(chancesAccumulated);
        console.log(majorAttributes);
        console.log(minorAttributes);

        let accumulatedAttributes = {
            intelligence,
            dexterity,
            charisma,
            constitution,
            strength
        }

        console.log(accumulatedAttributes);

        //Realizamos un número de tiradas de dado por nivel y asignamos 1 punto al modificador correspondiente
        for (let i = 0; i < ATTRIBUTES_INCREASE_PER_LEVEL; ++i)
        {
            //Tiramos un dado de 100 caras
            const d100 = new Roll(100, 1, 0);
            const d100roll = d100.execute();
            accumulatedAttributes = calculateAttributesForOneRoll(d100roll, chancesAccumulated, accumulatedAttributes);
        }

        accumulatedAttributes = {...accumulatedAttributes, insanity};

        console.log(accumulatedAttributes);
        
        
        return accumulatedAttributes;

    }
    catch (error) 
    {
        throw error;
    }
    

}

const calculateAttributesForOneRoll = (roll, chances, {intelligence, dexterity, charisma, constitution, strength}) =>
{
    console.log(roll);
    const attributeChance = Math.min(...chances.filter(chance => roll <= chance));
    const attributeId = chances.indexOf(attributeChance);

    const returnAttributes = {
        intelligence,
        dexterity,
        charisma,
        constitution,
        strength
    }

    switch (attributeId)
    {
        case LevelUpAttributes.INTELLIGENCE:
            returnAttributes.intelligence++;
            break;
        case LevelUpAttributes.DEXTERITY:
            returnAttributes.dexterity++;
            break;
        case LevelUpAttributes.CHARISMA:
            returnAttributes.charisma++;
            break;
        case LevelUpAttributes.CONSTITUTION:
            returnAttributes.constitution++;
            break;
        case LevelUpAttributes.STRENGTH:
            returnAttributes.strength++;
            break;

        default:
            throw new Error ("Attribute not valid");

    }

    return returnAttributes;
}

const assignChanceToAttributes = (majorAttributes, minorAttributes, normalAttributes) =>
{
    const attributeWeights = new Array(LevelUpAttributes.TOTAL);
    
    //Los atributos MAJOR tendrán un peso total de 40/100 (Será 1)
    //Sólo hay uno.
    const numMajorAttributes = majorAttributes.length;
    const percentPerMajorAttr = Math.ceil(40 / numMajorAttributes);

    //Asignamos pesos a atributos major
    assignAttributeChance(attributeWeights, majorAttributes, percentPerMajorAttr);

    //Los atributos MINOR tendrán un peso total de 24/100 (serán 2-3)
    const numMinorAttributes = minorAttributes.length;
    const percentPerMinorAttr = Math.ceil(24 / numMinorAttributes);

    //Asignamos pesos a atributos minor
    assignAttributeChance(attributeWeights, minorAttributes, percentPerMinorAttr);

    //Los atributos NORMAL tendrán un peso total de 36/100 (serán 1-2)
    const numNormalAttributes = normalAttributes.length;
    const percentPerNormalAttr = Math.ceil(36 / numNormalAttributes);

    //Asignamos pesos a atributos minor
    assignAttributeChance(attributeWeights, normalAttributes, percentPerNormalAttr);

    return attributeWeights;

}

const assignAttributeChance = (attributeWeights, attributesToAssign, percent) =>
{

    for (let i = 0; i < attributesToAssign.length; ++i)
    {
        switch (attributesToAssign[i])
        {
            case "Intelligence":
                attributeWeights[LevelUpAttributes.INTELLIGENCE] = percent;
                break;
            case "Dexterity":
                attributeWeights[LevelUpAttributes.DEXTERITY] = percent;
                break;
            case "Charisma":
                attributeWeights[LevelUpAttributes.CHARISMA] = percent;
                break;
            case "Constitution":
                attributeWeights[LevelUpAttributes.CONSTITUTION] = percent;
                break;
            case "Strength":
                attributeWeights[LevelUpAttributes.STRENGTH] = percent;
                break;

            default:
                throw new Error ("Attribute not valid");

        }
    }
}


const updateGoldInLevel = (player, level) => {

    //Calculate gold quantity when level ups one unit
    console.log("Enters updateGold with level: " + level)

    //Create percentileBar with Charisma prob
    const charisma = player.attributes.charisma;

    const percentileBar = PercentileBar.create20CriticalAndFumble(charisma);

    //Throw 1D100
    const d100 = new Roll(100, 1, 0);
    const d100roll = d100.execute();
    console.log(d100roll);

    const typeOfRoll = percentileBar.getTypeOfRoll(d100roll);
    //console.log("Type of Roll: " + typeOfRoll);

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


    const goldToAdd = goldManager.calculateGold(level, typeOfRoll);
    
    console.log("Gold obtained");
    console.log("Type of roll (0-5): " + typeOfRoll);
    console.log(goldToAdd + " silver coins");

    return goldToAdd;


}

const getRandomEquipment = async(player, levelToUpdate) => {

    try {

        const allEquipment = await getAllEquipment();

        console.log("All Equipment recovered");

        const nonUniqueEquipment = allEquipment.filter(item => item.isUnique === false);

        const minlevelToFilter = Math.max(1, levelToUpdate - 2);
        const maxlevelToFilter = levelToUpdate + 2;

        console.log("Level To Update");
        console.log(levelToUpdate);



        console.log(minlevelToFilter);
        console.log(maxlevelToFilter);
        
        const probability = [20, 80]; //20% prob [1, item.min_lvl-3]
                                    //80% prob [item.min_lvl-2, item.min_lvl+2]
        
        //Tiramos un dado de 100 caras
        const d100 = new Roll(100, 1, 0);
        const d100roll = d100.execute();

        console.log("D100");
        console.log(d100roll);
        let availableEquipment;
        if (d100roll <= probability[0])
        {
            availableEquipment = nonUniqueEquipment.filter(item => item.min_lvl <= minlevelToFilter);
        }
        else
        {
            availableEquipment = nonUniqueEquipment.filter(item => item.min_lvl > minlevelToFilter &&  item.min_lvl <= maxlevelToFilter);
        }

        
        // OZAR: TODO Corregir para casos de equipo no existente.
        // En ese caso, cogeríamos equipo desde nivel 1 a nivel item.min_lvl-3
        const numPiece = Math.floor(Math.random() * availableEquipment.length);
        const randomPiece = availableEquipment[numPiece];

        console.log(randomPiece);

        return randomPiece;

    }
    catch (error) 
    {
        throw error;
    }
    
    


}

const getAllEquipment = async() => {
    const allWeapons = await Weapon.find().exec();
    const allArmors = await Armor.find().exec();
    const allArtifacts = await Artifact.find().exec();
    const allHelmets = await Helmet.find().exec();
    const allBoots = await Boot.find().exec();
    const allRings = await Ring.find().exec();
    const allShields = await Shield.find().exec();

    return [...allWeapons, ...allArmors, ...allHelmets, ...allArtifacts, ...allBoots, ...allRings, ...allShields];
  
    
}




module.exports = {
  getAllPlayers,
  getHallOfFame,
  getPlayerByEmail,
  getOnePlayer,
  createNewPlayer,
  updateOnePlayer,
  updateTask,
  updateGoldOrExperienceForOnePlayer
};
