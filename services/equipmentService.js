const Equipment = require('../models/equipmentModel');
const Profile = require('../models/profileModel');


const getAllEquipment = async () => {  
    try
    {
        
        const equipments = await Equipment.find();
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
        const weapons = profileEquipment.filter(item => item.type === "Weapon");
        const artifacts = profileEquipment.filter(item => item.type === "artifact");
        const armor = profileEquipment.filter(item => item.type === "armor");
        const potions = profileEquipment.filter(item => item.type === "potion");

        return {
            weapons, artifacts, armor, potions
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