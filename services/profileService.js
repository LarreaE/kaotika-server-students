
const Profile = require('../models/profileModel'); 
const Weapon = require('../models/weaponModel');
const Armor = require('../models/armorModel');
const Artifact = require('../models/artifactModel');
const PotionHealing = require('../models/potionHealingModel');
const PotionAntidote = require('../models/potionAntidoteModel');
const PotionEnhancer = require('../models/potionEnhancerModel');
const Helmet = require('../models/helmetModel');
const Boot = require('../models/bootModel');
const Shield = require('../models/shieldModel');
const Ring = require('../models/ringModel');




const getAllProfiles = async () => {  
    try
    {
     
        const allProfiles = await Profile.find().exec();
        const allWeapons = (await Weapon.find().exec()).slice(0,9);
        const allArmors = (await Armor.find().exec()).slice(0,6);
        const allArtifacts = (await Artifact.find().exec()).slice(0,3);
        const allHealingPotions = (await PotionHealing.find().exec()).slice(0,3);
        const allAntidotes = (await PotionAntidote.find().populate('recovery_effect').exec()).slice(0,3);
        const allEnhancerPotions = (await PotionEnhancer.find().exec()).slice(0,3);

        
        

        //console.log(`Num armaduras: + ${allWeapons.length}`);
    
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

const getProfileById = async (id) => { 
    try
    {


        //console.log("Entra");
        const profile = await Profile.findById(id).exec();  


        return profile;
    }
    catch (error) 
    {
        throw error;
    }

};

module.exports = {
    getAllProfiles,
    getProfileById
    
}


