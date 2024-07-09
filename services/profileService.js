
const Profile = require('../models/profileModel'); 
const Weapon = require('../models/weaponModel');
const Armor = require('../models/armorModel');
const Artifact = require('../models/artifactModel');
const PotionHealing = require('../models/potionHealingModel');
const PotionAntidote = require('../models/potionAntidoteModel');
const PotionEnhancer = require('../models/potionEnhancerModel');




const getAllProfiles = async () => {  
    try
    {
     
        const allProfiles = await Profile.find().exec();
        const allWeapons = await Weapon.find().exec();
        const allArmors = await Armor.find().exec();
        const allArtifacts = await Artifact.find().exec();
        const allHealingPotions = await PotionHealing.find().exec();
        const allAntidotes = await PotionAntidote.find().populate('recovery_effect').exec();
        const allEnhancerPotions = await PotionEnhancer.find().exec();

  

    
        const returnProfiles = [];

        for (let i = 0; i < allProfiles.length; ++i)
        {
            const profileId = allProfiles[i]._id;

            const weapons = allWeapons.filter(item => 
                item.profiles.some(id => id.equals(profileId))
            );

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


