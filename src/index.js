
//index.js
const express = require("express"); 
const bodyParser = require("body-parser");
const v1WorkoutRouter = require("./routes/workoutRoutes");
const playerRouter = require("./routes/playerRoutes");
const classRouter = require("./routes/classRoutes");

const mongoose =  require ('mongoose');
const mongodbRoute = 'mongodb+srv://oscar:tst_sr_0@cluster0.pynwe.mongodb.net/Kaotika?retryWrites=true&w=majority';


const app = express(); 
const PORT = process.env.PORT || 3000; 

// Use bodyparser
app.use(bodyParser.json());

//Load router into /api/v1
app.use("/api/workouts", v1WorkoutRouter);
app.use("/players", playerRouter);
app.use("/classes", classRouter);


async function start() {
    try 
    {
        await mongoose.connect(mongodbRoute);
        app.listen(PORT, () => { 
            console.log(`API is listening on port ${PORT}`); 
        });
        console.log('Conexión con Mongo correcta.')
    }   
    catch (error)
    {   
        console.log(`Error al conectar a la base de datos: ${error.message}`);
    }
    
    
    // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

start();


  

