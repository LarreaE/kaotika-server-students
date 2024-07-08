const Equipment = require('../models/equipmentModel');
const Profile = require('../models/profileModel');


const getAllEquipment = async () => {  
    try
    {
        
        const equipments = await Equipment.find().exec();
        //console.log(equipments);
        return equipments;
    }
    catch (error)
    {
        throw error;
    }
};



const getEquipmentByIdProfile = async (id) => { 
    try
    {
        console.log(id);

        //Obtenemos el equipo del perfil 
        const equipment = await getAllEquipment();

        const profileEquipment = equipment.filter(item => 
            item.profiles.some(profileId => profileId.equals(id))
        );

        //Extraemos las armas
        const weapons = profileEquipment.filter(item => item.type === "weapon");
        const artifacts = profileEquipment.filter(item => item.type === "artifact");
        const armor = profileEquipment.filter(item => item.type === "armor");
        const healingPotions = profileEquipment.filter(item => item.type === "healing");
        const antidotePotions = profileEquipment.filter(item => item.type === "antidote");
        const enhancerPotions = profileEquipment.filter(item => item.type === "enhancer");

        //const potions = profileEquipment.filter(item => item.type === "potion");

        return {
            weapons, 
            artifacts, 
            armor, 
            healing_potions: healingPotions, 
            antidote_potions: antidotePotions,
            enhancer_potions: enhancerPotions
        }
        
    }
    catch (error) 
    {
        throw error;
    }
};




module.exports = {
    getAllEquipment,
    getEquipmentByIdProfile
  
};