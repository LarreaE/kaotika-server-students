
const Equipment = require('../models/equipmentModel');
const { schema } = require('../models/profileModel');
const profileService = require('../services/profileService');

const mongoose =  require ('mongoose');
const mongodbRoute = 'mongodb+srv://oscar:tst_sr_0@cluster0.pynwe.mongodb.net/Kaotika?retryWrites=true&w=majority';

//Willpower: Asignación de orden de turnos. Intervención mental en enemigos. Estado de salud mental.
//Strength: Daño del arma. Mínimo para usar armas melee
//Intelligence: Interviene en la prababilidad de éxito al crear y usar una poción. calidad de creación de pociones. Mínimo para usar pociones. A más inteligencia más efecto posible
//Constitution: Interviene en el cálculo de los HP iniciales.
//Dexterity: Mínimo para usar armas missile. Interviene en la probabilidad de éxito al atacar con armas.





const Profiles = {
    SCHOLAR:    0,
    PARIAH:     1,
    JUGGLER:    2,
    EMBALMER:   3,
    BLASPHEMER: 4,
    GOSSIPER:   5,
    BUMBLER:    6,
    POET:       7   
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
        await connectToDB();
        let deletedWorkout = await Equipment.deleteMany();     
        return deletedWorkout;
    }
    catch (error)
    {
        throw error;
    }  
}



const createEquipment = async () => {
    try
    { 
        await connectToDB();

        const profiles = await profileService.getAllProfiles();

        const scholarId       = profiles[Profiles.SCHOLAR]._id;
        const pariahId        = profiles[Profiles.PARIAH]._id;
        const jugglerId       = profiles[Profiles.JUGGLER]._id;
        const embalmerId      = profiles[Profiles.EMBALMER]._id;
        const blasphemerId    = profiles[Profiles.BLASPHEMER]._id;
        const gossiperId      = profiles[Profiles.GOSSIPER]._id;
        const bumblerId       = profiles[Profiles.BUMBLER]._id;
        const poetId          = profiles[Profiles.POET]._id;


        const weapon1 = new Equipment({
            name: "Pinching Yo-yo",
            type: "weapon",
            image: "/images/equipment/weapons/sword_1.jpg",
            effect: [
                {
                    attribute: "dexterity",
                    value:     10
                },
                {
                    attribute: "constitution",
                    value:     -15
                }

            ],
            profiles:[
                jugglerId
            ]

        })


        const weapon2 = new Equipment({
            name: "Staff of Disgreace",
            type: "weapon",
            image: "/images/equipment/weapons/staff_1.jpg",
            effect: [
                {
                    attribute: "dexterity",
                    value:     3
                },
                {
                    attribute: "constitution",
                    value:     -3
                }

            ],
            profiles:[
                pariahId
            ]

        })



        const equipments = await Equipment.find();

        let equipmentToInsert;
        equipmentToInsert = new Equipment(weapon1);

        const equipment = await equipmentToInsert.save();   
        
        console.log(equipment);
        return equipments;
    }
    catch (error)
    {
        throw error;
    }
};

clearEquipment();
//createEquipment();