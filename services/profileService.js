
const Profile = require('../models/profileModel'); 
//const Equipment = require('../models/equipmentModel'); 
const equipmentService = require('./equipmentService');




const getAllProfiles = async () => {  
    try
    {
     
        //const equipment = await Equipment.find().exec();
        const profiles = await Profile.find().exec();
        const equipment = await equipmentService.getAllEquipment();




        //console.log(equipment[5]);
        
        // for (let i = 0; i < equipment.length; ++i)
        // {
        //     console.log(profiles);
        // }


        // for (let i = 0; i < profiles.length; ++i)
        // {
        //     console.log(profiles[i].name);
        //     console.log("-----------------------------------");
            
        //     const profileId = profiles[i]._id;
        //     //console.log("Entra" + profileId);

        //     const equipmentByProfile = equipment.filter(item => 
        //         item.profiles.some(id => id.equals(profileId))
        //     );

        //     console.log(equipmentByProfile);
        //     console.log("-----------------------------------");
        // }


        // profiles[0].equipment = "dgdfgfdgdf";
        // profiles[0].things = "dgdfgfdgdf";
        
        // console.log(profiles[0]);
    
        const returnProfiles = [];

        for (let i = 0; i < profiles.length; ++i)
        {
            console.log(profiles[i].name);
            console.log("-----------------------------------");
            
            const profileId = profiles[i]._id;

            const equipmentByProfile = equipment.filter(item => 
                item.profiles.some(id => id.equals(profileId))
            );

            const weapons = equipmentByProfile.filter(item => item.type === "weapon");
            const artifacts = equipmentByProfile.filter(item => item.type === "artifact");
            const armor = equipmentByProfile.filter(item => item.type === "armor");
            const healingPotions = equipmentByProfile.filter(item => item.type === "healing");
            const antidotePotions = equipmentByProfile.filter(item => item.type === "antidote");
            const enhancerPotions = equipmentByProfile.filter(item => item.type === "enhancer");

            const returnProfile = {
                _id: profiles[i]._id,
                name: profiles[i].name,
                description: profiles[i].description,
                image: profiles[i].image,
                attributes: profiles[i].attributes,
                equipment: {    weapons, 
                                artifacts, 
                                armor, 
                                healing_potions: healingPotions, 
                                antidote_potions: antidotePotions,
                                enhancer_potions: enhancerPotions
                }
            }




            
            returnProfiles.push(returnProfile);

        }

        console.log(returnProfiles[0]);

        return returnProfiles;

    }      
    catch (error)
    {
        throw error;
    }
};

// const createNewProfile = async ({name, description, image, dex, int, cha, san, str, con}) => {
//     try 
//     {
        
//         //Cogemos todos los atributos
//         const attributes = await Attribute.find();
//         console.log(attributes[0]._id);


//         let attributeIds = attributes.map(attribute => attribute._id);
//         console.log(attributeIds);

//         let newProfile = {
//             name,
//             description,
//             image,
//             attributeIds

//         }

//         console.log("Create new profile");

//         console.log(newProfile);


//         let profileToInsert = new Profile(newProfile);

//         const createdProfile = [];//await profileToInsert.save();   
//         return createdProfile;
//     } 
//     catch (error) 
//     {
//         throw error;
//     }
// };

module.exports = {
    getAllProfiles
    
}


