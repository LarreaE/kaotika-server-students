
const Player = require('../models/playerModel');

const getAllPlayers = async () => {  
    try
    {
        
        const players = await Player.find().exec();
        console.log(players);
        return players;
    }
    catch (error)
    {
        throw error;
    }
};



const getPlayerByEmail = async (email) => { 
    try 
    {
        console.log("llega");
        const player = await Player.find({email: email}).exec();     
        return player;
    } 
    catch (error) 
    {
        throw error;
    }
};

const getOnePlayer = async (playerId) => { 
    try 
    {
        console.log(playerId);
        const player = await Player.findById(playerId);  
        return player;
    } 
    catch (error) 
    {
        throw error;
    }
};

const createNewPlayer = async (newPlayer) => {
    try 
    {
        let playerToInsert = new Player(newPlayer);
        const createdPlayer = await playerToInsert.save();   
        return createdPlayer;
    } 
    catch (error) 
    {
        throw error;
    }
};

const updateOnePlayer = async (playerId, changes) => {
    try 
    {
        let updatedPlayer = await Player.findByIdAndUpdate(playerId,{$set:changes},{new:true});
        return updatedPlayer;       
    } 
    catch (error) 
    {
        throw error;
    }
};


module.exports = {
  getAllPlayers,
  getPlayerByEmail,
  getOnePlayer,
  createNewPlayer,
  updateOnePlayer
};