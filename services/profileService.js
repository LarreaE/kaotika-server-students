
const Profile = require('../models/profileModel'); 



const getAllProfiles = async () => {  
    try
    {
        
        const profiles = await Profile.find().exec();
        console.log(profiles);
        return profiles;
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


