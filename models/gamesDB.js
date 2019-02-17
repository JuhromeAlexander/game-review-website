"use-strict";

//Get Connection to the Database
var db = require('../db-connection'); //Reference to db-connection.js

class gamesDB{

    getAllGames(callback){
        var sql = "SELECT * FROM games";

        //To call built in query function to databse connection
        db.query(sql, callback);
    }

    
    getGameInformation(gamesId,callback){

        var sql = "SELECT * FROM games WHERE game_id = ?"

        return db.query(sql, [gamesId], callback)

    }

    getGameGenre(game_id, callback){

        var sql = "SELECT genre.genreName, games.game_id FROM genre INNER JOIN games ON genre.gameId=games.game_id WHERE games.game_id = ?";

        db.query(sql, [game_id], callback);

    }

    getGamePlatform(game_id, callback){

        var sql = "SELECT platform.platformName, games.game_id FROM platform INNER JOIN games ON platform.gameIdP=games.game_id WHERE games.game_id = ?";

        db.query(sql, [game_id], callback);

    }

    searchGamesByTitle(userInput, callback){

        var sql = "SELECT * FROM games WHERE title LIKE '%" + userInput +"%'";

        db.query(sql,[userInput],callback);

    }

    getGamesByPlatformPs4(callback){

        var sql = "SELECT * FROM games INNER JOIN platform ON games.game_id=platform.gameIdP WHERE platform.platformName =\"ps4\"";

        db.query(sql,callback);

    }

    getGamesByPlatformPc(callback){

        var sql = "SELECT * FROM games INNER JOIN platform ON games.game_id=platform.gameIdP WHERE platform.platformName =\"pc\"";

        db.query(sql,callback);
    }

    getGamesByPlatformXbox(callback){

        var sql = "SELECT * FROM games INNER JOIN platform ON games.game_id=platform.gameIdP WHERE platform.platformName ='xbox'";

        db.query(sql,callback);

    }

    getGamesByPlatformOthers(callback){

        var sql = "SELECT * FROM games INNER JOIN platform ON games.game_id=platform.gameIdP WHERE (NOT platform.platformName ='xbox' AND NOT platform.platformName ='pc' AND NOT platform.platformName ='ps4')";

        db.query(sql,callback);
    }
}

module.exports = gamesDB;