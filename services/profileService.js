
const Profile = require('../models/profileModel'); 
//const Equipment = require('../models/equipmentModel'); 
//const equipmentService = require('./equipmentService');
const Weapon = require('../models/weaponModel');
const Armor = require('../models/armorModel');
const Artifact = require('../models/artifactModel');
const PotionHealing = require('../models/potionHealingModel');
const PotionAntidote = require('../models/potionAntidoteModel');
const PotionEnhancer = require('../models/potionEnhancerModel');




const getAllProfiles = async () => {  
    try
    {
     
        //const equipment = await Equipment.find().exec();
        const allProfiles = await Profile.find().exec();
        const allWeapons = await Weapon.find().exec();
        const allArmors = await Armor.find().exec();
        const allArtifacts = await Artifact.find().exec();
        const allHealingPotions = await PotionHealing.find().exec();
        const allAntidotes = await PotionAntidote.find().exec();
        const allEnhancerPotions = await PotionEnhancer.find().exec();
        
        //const equipment = await equipmentService.getAllEquipment();




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

        for (let i = 0; i < allProfiles.length; ++i)
        {
            console.log(allProfiles[i].name);
            console.log("-----------------------------------");
            
            const profileId = allProfiles[i]._id;

            const weapons = allWeapons.filter(item => 
                item.profiles.some(id => id.equals(profileId))
            );

            //console.log(weapons);

            const artifacts = allArtifacts.filter(item => 
                item.profiles.some(id => id.equals(profileId))
            );

            const armors = allArmors.filter(item => 
                item.profiles.some(id => id.equals(profileId))
            );

            const healingPotions = allHealingPotions.filter(item => 
                item.profiles.some(id => id.equals(profileId))
            );

            const antidotePotions = allAntidotes.filter(item => 
                item.profiles.some(id => id.equals(profileId))
            );

            const enhancerPotions = allEnhancerPotions.filter(item => 
                item.profiles.some(id => id.equals(profileId))
            );



            // const weapons = equipmentByProfile.filter(item => item.type === "weapon");
            // const artifacts = equipmentByProfile.filter(item => item.type === "artifact");
            // const armors = equipmentByProfile.filter(item => item.type === "armor");
            // const healingPotions = equipmentByProfile.filter(item => item.type === "healing");
            // const antidotePotions = equipmentByProfile.filter(item => item.type === "antidote");
            // const enhancerPotions = equipmentByProfile.filter(item => item.type === "enhancer");

            const returnProfile = {
                _id: allProfiles[i]._id,
                name: allProfiles[i].name,
                description: allProfiles[i].description,
                image: allProfiles[i].image,
                attributes: allProfiles[i].attributes,
                equipment: {    weapons, 
                                artifacts, 
                                armors, 
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


