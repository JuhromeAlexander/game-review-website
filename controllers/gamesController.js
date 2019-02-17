"use strict"
const GamesDB = require('../models/gamesDB');
const Game = require('../models/games');

var gamesDB = new GamesDB();

function getAllGames(request, respond){
    gamesDB.getAllGames(function(error,result){
        if(error){
            respond.json(error);
        }else{
            respond.json(result);
        }
    });
}

function getGameInfo(request, respond){
    var gameId = request.params.game_id;
    gamesDB.getGameInformation(gameId, function(error, result){
        if(error){
            respond.json(error);
        }else{
            respond.json(result);
        }
    });

}

function getGameGenre(request, respond){
    var game_id = request.params.game_id;
    gamesDB.getGameGenre(game_id, function(error, result){
        if(error){
            respond.json(error);
        }else{
            respond.json(result);
        }
    });
}

function getGamePlatform(request, respond){
    var game_id = request.params.game_id;
    gamesDB.getGamePlatform(game_id, function(error,result){
        if(error){
            respond.json(error);
        }else{
            respond.json(result);
        }
    });
}

function searchGamesByTitle(request, respond){
    var userInput = request.body.userInput;
    gamesDB.searchGamesByTitle(userInput, function(error, result){
        if(error){
            respond.json(error);
        }else{
            respond.json(result);
        }
    });
}

function getGamesByPlatformPs4(request, respond){
    gamesDB.getGamesByPlatformPs4(function(error,result){
        if(error){
            respond.json(error);
        }else{
            respond.json(result);
        }
    });
}

function getGamesByPlatformPc(request, respond){
    gamesDB.getGamesByPlatformPc(function(error,result){
        if(error){
            respond.json(error);
        }else{
            respond.json(result);
        }
    });
}

function getGamesByPlatformXbox(request, respond){
    gamesDB.getGamesByPlatformXbox(function(error,result){
        if(error){
            respond.json(error);
        }else{
            respond.json(result);
        }
    });
}

function getGamesByPlatformOthers(request, respond){
    gamesDB.getGamesByPlatformOthers(function(error,result){
        if(error){
            respond.json(error);
        }else{
            respond.json(result);
        }
    });
}

module.exports = { getAllGames, getGameInfo, getGameGenre, getGamePlatform, searchGamesByTitle, getGamesByPlatformOthers, getGamesByPlatformPs4, getGamesByPlatformXbox, getGamesByPlatformPc }