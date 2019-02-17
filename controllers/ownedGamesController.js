"use strict";

const OwnedGamesDB = require('../models/ownedGamesDB');
const OwnedGames = require('../models/ownedGames');

var ownedGamesDB = new OwnedGamesDB();

function addToOwnedGames(request, respond){
    
    var ownedGames = new OwnedGames(null, request.body.game_idOwned, request.body.user_idOwned);

    ownedGamesDB.addToOwnedGames(ownedGames, function(error,result){
        if(error){
            respond.json(error);
        }else{
            respond.json(result);
        }
    });

}

function displayOwnedGamesUser(request, respond){

    var user_idOwned = request.params.user_idOwned;

    ownedGamesDB.displayOwnedGamesUser(user_idOwned, function(error, result){
        if(error){
            respond.json(error);
        }else{
            respond.json(result);
        }
    });

}

module.exports = { addToOwnedGames, displayOwnedGamesUser };