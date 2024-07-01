const Equipment = require('../models/equipmentModel');
const Profile = require('../models/profileModel');


const getAllEquipment = async () => {  
    try
    {
        
        const equipments = await Equipment.find();
        console.log(equipments);
        return equipments;
    }
    catch (error)
    {
        throw error;
    }
};



const getEquipmentByProfile = async (profile) => { 
    try
    {

        //const profileFound = await Profile.findOne({profile}).exec();
        //console.log(profileFound);

        const equipment = await Equipment.find().populate("profiles");
        console.log(equipment) 

        return {equipment};
    }
    catch (error) 
    {
        throw error;
    }
};




module.exports = {
    getAllEquipment,
    getEquipmentByProfile
  
};