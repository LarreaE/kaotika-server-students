

const Weapon = require('../models/weaponModel');
const Armor = require('../models/diseaseModel');
const Artifact = require('../models/artifactModel');
const PotionHealing = require('../models/potionHealingModel');
const PotionAntidote = require('../models/potionAntidoteModel');
const PotionEnhancer = require('../models/potionEnhancerModel');

constfs = require('fs');





const { schema } = require('../models/profileModel');
const profileService = require('../services/profileService');

const mongoose =  require ('mongoose');
const mongodbRoute = 'mongodb+srv://oscar:tst_sr_0@cluster0.pynwe.mongodb.net/Kaotika?retryWrites=true&w=majority';



const Profiles = {
    SCHOLAR:    0,
    PARIAH:     1,
    JUGGLER:    2,
    EMBALMER:   3,
    BLASPHEMER: 4,
    GOSSIPER:   5,
    BUMBLER:    6,
    POET:       7,
    TOTAL_PROFILES: 8  
}












const connectToDB = async() => {
    try 
    {
        
        await mongoose.connect(mongodbRoute);
        console.log('Conexión con Mongo correcta.')
    }   
    catch (error)
    {   
        console.log(`Error al conectar a la base de datos: ${error.message}`);
    }
}


const clearEquipment = async() => {

    try
    { 
        //await connectToDB();

        let deletedWorkout = [];

        await Armor.deleteMany(); 
        await Weapon.deleteMany(); 
        await PotionAntidote.deleteMany(); 
        await PotionEnhancer.deleteMany(); 
        await PotionHealing.deleteMany(); 
        await Artifact.deleteMany(); 
            
        return deletedWorkout;
    }
    catch (error)
    {
        throw error;
    }  
}


const readFromDB = async() => {

    const data = fs.readFileSync('../database/Kaotika.armors.json',{ encoding: 'utf8', flag: 'r' });

    console.log(JSON.parse(data));

}


const createEquipment = async () => {
    try
    { 

        await readFromDB();
        await connectToDB();

        await clearEquipment();

        const profiles = await profileService.getAllProfiles();

        const scholarId       = profiles[Profiles.SCHOLAR]._id;
        const pariahId        = profiles[Profiles.PARIAH]._id;
        const jugglerId       = profiles[Profiles.JUGGLER]._id;
        const embalmerId      = profiles[Profiles.EMBALMER]._id;
        const blasphemerId    = profiles[Profiles.BLASPHEMER]._id;
        const gossiperId      = profiles[Profiles.GOSSIPER]._id;
        const bumblerId       = profiles[Profiles.BUMBLER]._id;
        const poetId          = profiles[Profiles.POET]._id;



        const data = getEquipment(scholarId, pariahId, jugglerId, embalmerId, blasphemerId, gossiperId, bumblerId, poetId)



        for (let i = 0; i < data.length; ++i)
        {
            const item = data[i];
            const type = item.type;
            let newItem;
            if (type === "weapon")
            {
                newItem = new Weapon(item);
            }
            else if (type === "armor")
            {
                newItem = new Armor(item);
            }
            else if (type === "artifact")
            {
                newItem = new Artifact(item);
            }
            else if (type === "healing")
            {
                newItem = new PotionHealing(item); 
            }
            else if (type === "antidote")
            {
                newItem = new PotionAntidote(item);
            }
            else if (type === "enhancer")
            {
                newItem = new PotionEnhancer(item);  
            }
            else
            {
                throw new Error ("Equipment type not valid")
            }


        
                


            const equipment = await newItem.save();
            //console.log(equipment);

        }


        mongoose.connection.close();

    }
    catch (error)
    {
        throw error;
    }
};





function getEquipment(scholarId, pariahId, jugglerId, embalmerId, blasphemerId, gossiperId, bumblerId, poetId)
{

 

    const equipment = 

    [
        {
            "name": "Celestial Robe of the Archmage",
            "description": "ABC",
            "type": "armor",
            "image": "/images/equipment/armor/robe_1.jpg",
            "modifiers": [
                {
                    "attribute": "Constitution",
                    "value":     5
                }

            ],
            "min_attr":[
                {
                    "name": "Dexterity",
                    "value": 10
                }

            ],
            "profiles":[
                scholarId,                     
                jugglerId,                  
                blasphemerId,
                gossiperId,  
                poetId  
            ]

        },
        {
            "name": "Ethereal Vestments of the Whispering Winds",
            "description": "ABC",
            "type": "armor",
            "image": "/images/equipment/armor/robe_2.jpg",
            "modifiers": [
                {
                    "attribute": "Constitution",
                    "value":     7
                },
                {
                    "attribute": "Dexterity",
                    "value":     -3
                }


            ],
            "min_attr":[
                {
                    "name": "Dexterity",
                    "value": 10
                }

            ],
            "profiles":[
                scholarId,                     
                jugglerId,                  
                blasphemerId,
                gossiperId,  
                poetId    
            ]

        },
        {
            "name": "Abyssal Tunic of the Shadow Lord",
            "description": "ABC",
            "type": "armor",
            "image": "/images/equipment/armor/robe_3.jpg",
            "modifiers": [
                {
                    "attribute": "Constitution",
                    "value":     8
                },
                {
                    "attribute": "Intelligence",
                    "value":     2
                },
                {
                    "attribute": "Dexterity",
                    "value":     -6
                }


            ],
            "min_attr":[
                {
                    "name": "Dexterity",
                    "value": 10
                }

            ],
            "profiles":[ 
                scholarId,                     
                jugglerId,                  
                blasphemerId,
                gossiperId,  
                poetId    
            ]

        },
        {
            "name": "Shadowstalker Leather Jerkin",
            "description": "ABC",
            "type": "armor",
            "image": "/images/equipment/armor/armor_1.jpg",
            "modifiers": [
                {
                    "attribute": "Constitution",
                    "value":     10
                },
                {
                    "attribute": "Strength",
                    "value":     -5
                },
                {
                    "attribute": "Dexterity",
                    "value":     -3
                }


            ],
            "min_attr":[
                {
                    "name": "Dexterity",
                    "value": 5
                },
                {
                    "name": "Strength",
                    "value": 15
                }

            ],
            "profiles":[
                pariahId,    
                embalmerId,                
                bumblerId     
            ]

        },
        {
            "name": "Huntsman's Wildwood Cuirass",
            "description": "ABC",
            "type": "armor",
            "image": "/images/equipment/armor/armor_2.jpg",
            "modifiers": [
                {
                    "attribute": "Constitution",
                    "value":     12
                },
                {
                    "attribute": "Strength",
                    "value":     -9
                },
                {
                    "attribute": "Dexterity",
                    "value":     -3
                }


            ],
            "min_attr":[
                {
                    "name": "Dexterity",
                    "value": 5
                },
                {
                    "name": "Strength",
                    "value": 15
                }

            ],
            "profiles":[
                pariahId,    
                embalmerId,                
                bumblerId    
            ]

        },
        {
            "name": "Dragonhide Battle Vest",
            "description": "ABC",
            "type": "armor",
            "image": "/images/equipment/armor/armor_3.jpg",
            "modifiers": [
                {
                    "attribute": "Constitution",
                    "value":     13
                },
                {
                    "attribute": "Intelligence",
                    "value":     4
                },
                {
                    "attribute": "Strength",
                    "value":     -11
                },
                {
                    "attribute": "Dexterity",
                    "value":     -4
                }


            ],
            "min_attr":[
                {
                    "name": "Dexterity",
                    "value": 5
                },
                {
                    "name": "Strength",
                    "value": 15
                }

            ],
            "profiles":[
                pariahId,    
                embalmerId,                
                bumblerId  
                   
            ]

        },
        {
            "name": "Blade of Eternal Flame",
            "description": "ABC",
            "type": "weapon",
            "image": "/images/equipment/weapons/sword_1.jpg",
            "damage": "2D8",
            "base_percentage": 20,
            "modifiers": [
                {
                    "attribute": "Strength",
                    "value":     -1
                }


            ],
            "min_level": 1,
            "profiles":[
                scholarId,   
                pariahId,   
                jugglerId,   
                embalmerId,  
                blasphemerId,
                gossiperId,  
                bumblerId,
                poetId 
            ]

        },
        {
            "name": "Stormbringer's Fury",
            "description": "ABC",
            "type": "weapon",
            "image": "/images/equipment/weapons/sword_2.jpg",
            "damage": "2D12",
            "base_percentage": 15,
            "modifiers": [
                {
                    "attribute": "Strength",
                    "value":     -3
                }


            ],
            "min_level": 1,
            "profiles":[
                scholarId,   
                pariahId,   
                jugglerId,   
                embalmerId,  
                blasphemerId,
                gossiperId,  
                bumblerId,
                poetId  
            ]

        },
        {
            "name": "Arthur's Feather",
            "description": "ABC",
            "type": "weapon",
            "image": "/images/equipment/weapons/sword_3.jpg",
            "damage": "4D12+3",
            "base_percentage": 5,
            "modifiers": [
                {
                    "attribute": "Dexterity",
                    "value":     -3
                },
                {
                    "attribute": "Strength",
                    "value":     -1
                },
                {
                    "attribute": "Intelligence",
                    "value":     -5
                }


            ],
            "min_level": 1,
            "profiles":[
                scholarId 
                
            ]

        },
        {
            "name": "Poisoned Pouch",
            "description": "ABC",
            "type": "weapon",
            "image": "/images/equipment/weapons/sword_4.jpg",
            "damage": "4D12+3",
            "base_percentage": 5,
            "modifiers": [
                {
                    "attribute": "Constitution",
                    "value":     -4
                },
                {
                    "attribute": "Strength",
                    "value":     -5
                }


            ],
            "min_level": 1,
            "profiles":[
                pariahId  
                
            ]

        },
        {
            "name": "Twirling Yo-yo",
            "description": "ABC",
            "type": "weapon",
            "image": "/images/equipment/weapons/sword_5.jpg",
            "damage": "3D12",
            "base_percentage": 5,
            "modifiers": [
                {
                    "attribute": "Strength",
                    "value":     -2
                },
                {
                    "attribute": "Dexterity",
                    "value":     -3
                },
                {
                    "attribute": "Insanity",
                    "value":     5
                }


            ],
            "min_level": 1,
            "profiles":[
                jugglerId 
                
            ]

        },
        {
            "name": "Undertaker's Embalming Scalpel",
            "description": "ABC",
            "type": "weapon",
            "image": "/images/equipment/weapons/sword_5.jpg",
            "damage": "1D12",
            "base_percentage": 5,
            "modifiers": [
                {
                    "attribute": "Strength",
                    "value":     -1
                },
                {
                    "attribute": "Insanity",
                    "value":     10
                }


            ],
            "min_level": 1,
            "profiles":[
                embalmerId  
                
            ]

        },
        {
            "name": "Heretic Anthem",
            "description": "ABC",
            "type": "weapon",
            "image": "/images/equipment/weapons/sword_5.jpg",
            "damage": "3D12+4",
            "base_percentage": 5,
            "modifiers": [
                {
                    "attribute": "Strength",
                    "value":     -1
                },
                {
                    "attribute": "Intelligence",
                    "value":     -5
                }


            ],
            "min_level": 1,
            "profiles":[
                blasphemerId  
                
            ]

        },
        {
            "name": "Inferno's Ear",
            "description": "ABC",
            "type": "weapon",
            "image": "/images/equipment/weapons/sword_5.jpg",
            "damage": "3D12+4",
            "base_percentage": 5,
            "modifiers": [
                {
                    "attribute": "Strength",
                    "value":     -2
                },
                {
                    "attribute": "Constitution",
                    "value":     -7
                },
                ,
                {
                    "attribute": "Dexterity",
                    "value":     3
                }


            ],
            "min_attr":[
                {
                    "name":     "Strength",
                    "value":    5
                },
                {
                    "name":     "Constitution",
                    "value":    5
                },
                {
                    "name":     "Dexterity",
                    "value":    10
                }

            ],
            "profiles":[
                gossiperId  
                
            ]

        },
        {
            "name": "Wooden Leg",
            "description": "ABC",
            "type": "weapon",
            "image": "/images/equipment/weapons/sword_5.jpg",
            "damage": "3D8+2",
            "base_percentage": 5,
            "modifiers": [
                {
                    "attribute": "Strength",
                    "value":     -12
                }


            ],
            "min_level": 1,
            "profiles":[
                bumblerId  
                
            ]

        },
        {
            "name": "Storyteller's Lute",
            "description": "ABC",
            "type": "weapon",
            "image": "/images/equipment/weapons/sword_5.jpg",
            "damage": "4D10",
            "base_percentage": 5,
            "modifiers": [
                {
                    "attribute": "Strength",
                    "value":     -3
                },
                {
                    "attribute": "Charisma",
                    "value":     -7
                }

            ],
            "min_level": 1,
            
            "profiles":[
                poetId  
                
            ]

        },

        //ARTIFACTS

        {
            "name": "Phoenix Feather Relic",
            "description": "ABC",
            "type": "artifact",
            "image": "/images/equipment/artifacts/artifact_1.jpg",
            
            "modifiers_charisma": [
                
                    {
                        "attribute": "Strength",
                        "value": 0.5  
                    }

            ],
            "modifiers": [
                {
                    "attribute": "Dexterity",
                    "value": -8   
                }

            ],
            "min_attr":[
                {
                    "name":     "Charisma",
                    "value":    10
                },
                {
                    "name":     "Dexterity",
                    "value":    15
                }

            ],
            "profiles":[
                scholarId,   
                pariahId,   
                jugglerId,   
                embalmerId,  
                blasphemerId,
                gossiperId,  
                bumblerId,
                poetId   
                
            ]

        },
        {
            "name": "Amulet of the Serpent's Eye",
            "description": "ABC",
            "type": "artifact",
            "image": "/images/equipment/artifacts/artifact_2.jpg",
            
            "modifiers_charisma": [
                
                    {
                        "attribute": "Intelligence",
                        "value": 0.5  
                    }

            ],
            "modifiers": [
                {
                    "attribute": "Strength",
                    "value": -8   
                }

            ],
            "min_attr":[
                {
                    "name":     "Charisma",
                    "value":    10
                },
                {
                    "name":     "Strength",
                    "value":    15
                }

            ],
            "profiles":[
                scholarId,   
                pariahId,   
                jugglerId,   
                embalmerId,  
                blasphemerId,
                gossiperId,  
                bumblerId,
                poetId   
                
            ]

        },
        {
            "name": "Orb of Infinite Wisdom",
            "description": "ABC",
            "type": "artifact",
            "image": "/images/equipment/artifacts/artifact_3.jpg",
            
            "modifiers_charisma": [
                
                    {
                        "attribute": "Constitution",
                        "value": 0.5  
                    }

            ],
            "modifiers": [
                {
                    "attribute": "Dexterity",
                    "value": -8   
                }

            ],
            "min_attr":[
                {
                    "name":     "Charisma",
                    "value":    10
                },
                {
                    "name":     "Constitution",
                    "value":    20
                }

            ],
            "profiles":[
                scholarId,   
                pariahId,   
                jugglerId,   
                embalmerId,  
                blasphemerId,
                gossiperId,  
                bumblerId,
                poetId   
                
            ]

        },
        {
            "name": "Elixir of Vitality",
            "description": "ABC",
            "type": "healing",
            "image": "/images/equipment/artifacts/potion_1.jpg",
            
            "modifiers": [
                {
                    "attribute": "Hit points",
                    "value": 20,
                    
                }

            ],
            "min_attr":[
                {
                    "name":     "Intelligence",
                    "value":    5
                }

            ],
            "profiles":[
                scholarId,   
                pariahId,   
                jugglerId,   
                embalmerId,  
                blasphemerId,
                gossiperId,  
                bumblerId,
                poetId   
                
            ]

        },
        {
            "name": "Potion of Rejuvenation",
            "description": "ABC",
            "type": "healing",
            "image": "/images/equipment/artifacts/potion_2.jpg",
            
            "modifiers": [
                {
                    "attribute": "Hit points",
                    "value": 40,
                    
                },
                {
                    "attribute": "Intelligence",
                    "value": -5 
                }


            ],
            "min_attr":[
                {
                    "name":     "Intelligence",
                    "value":    10
                }

            ],
            "profiles":[
                scholarId,   
                pariahId,   
                jugglerId,   
                embalmerId,  
                blasphemerId,
                gossiperId,  
                bumblerId,
                poetId   
                
            ]

        },
        {
            "name": "Essence of Restoration",
            "description": "ABC",
            "type": "healing",
            "image": "/images/equipment/artifacts/potion_3.jpg",
            
            "modifiers": [
                {
                    "attribute": "Hit points",
                    "value": 70
                },
                {
                    "attribute": "Intelligence",
                    "value": -15
                }


            ],
            "min_attr":[
                {
                    "name":     "Intelligence",
                    "value":    25
                }

            ],
            "profiles":[
                scholarId,   
                pariahId,   
                jugglerId,   
                embalmerId,  
                blasphemerId,
                gossiperId,  
                bumblerId,
                poetId   
                
            ]

        },
        {
            "name": "Potion of Restore Dexterity",
            "description": "ABC",
            "type": "antidote",
            "image": "/images/equipment/artifacts/potion_4.jpg",
            
            "recovery_effect": scholarId,
            "min_attr":[
                {
                    "name":     "Intelligence",
                    "value":    10
                }

            ],
            "profiles":[
                scholarId,   
                pariahId,   
                jugglerId,   
                embalmerId,  
                blasphemerId,
                gossiperId,  
                bumblerId,
                poetId   
                
            ]

        },
        {
            "name": "Potion of Restore Intelligence",
            "description": "ABC",
            "type": "antidote",
            "image": "/images/equipment/artifacts/potion_4.jpg",
            
            "recovery_effect": scholarId,
            "min_attr":[
                {
                    "name":     "Intelligence",
                    "value":    10
                }

            ],
            "profiles":[
                scholarId,   
                pariahId,   
                jugglerId,   
                embalmerId,  
                blasphemerId,
                gossiperId,  
                bumblerId,
                poetId   
                
            ]

        },
        {
            "name": "Potion of Restore Strength",
            "description": "ABC",
            "type": "antidote",
            "image": "/images/equipment/artifacts/potion_4.jpg",
            
            "recovery_effect": scholarId,
            "min_attr":[
                {
                    "name":     "Intelligence",
                    "value":    10
                }

            ],
            "profiles":[
                scholarId,   
                pariahId,   
                jugglerId,   
                embalmerId,  
                blasphemerId,
                gossiperId,  
                bumblerId,
                poetId   
                
            ]

        },
        {
            "name": "Potion of Increase Strength",
            "description": "ABC",
            "type": "enhancer",
            "image": "/images/equipment/artifacts/potion_4.jpg",
            "duration": 2,

            "modifiers": [
                {
                    "attribute": "Strength",
                    "value": 20
                }


            ],   
            "min_attr":[
                {
                    "name":     "Intelligence",
                    "value":    10
                }

            ],
            "profiles":[
                scholarId,   
                pariahId,   
                jugglerId,   
                embalmerId,  
                blasphemerId,
                gossiperId,  
                bumblerId,
                poetId   
                
            ]

        },
        {
            "name": "Potion of Madness",
            "description": "ABC",
            "type": "enhancer",
            "image": "/images/equipment/artifacts/potion_4.jpg",
            "duration": 2,

            "modifiers": [
                {
                    "attribute": "Insanity",
                    "value": 20
                }


            ],   
            "min_attr":[
                {
                    "name":     "Intelligence",
                    "value":    25
                }

            ],
            "profiles":[
                scholarId,   
                pariahId,   
                jugglerId,   
                embalmerId,  
                blasphemerId,
                gossiperId,  
                bumblerId,
                poetId   
                
            ]

        },
        {
            "name": "Potion of Increase Constitution",
            "description": "ABC",
            "type": "enhancer",
            "image": "/images/equipment/artifacts/potion_4.jpg",
            "duration": 2,

            "modifiers": [
                {
                    "attribute": "Constitution",
                    "value": 20
                }

            ],   
            "min_attr":[
                {
                    "name":     "Intelligence",
                    "value":    15
                }

            ],
            "profiles":[
                scholarId,   
                pariahId,   
                jugglerId,   
                embalmerId,  
                blasphemerId,
                gossiperId,  
                bumblerId,
                poetId   
                
            ]

        }
        
    ];

    return equipment

}

//clearEquipment();
createEquipment();