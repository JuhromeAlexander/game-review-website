"use strict";

var db = require('../db-connection');

class OwnedGamesDB{

    addToOwnedGames(ownedGame, callback){

        var sql = "INSERT INTO ownedgames (game_idOwned, user_idOwned) VALUES (?,?)"

        db.query(sql, [ownedGame.getGame_idOwned(), ownedGame.getUser_idOwned()], callback);

    }

    displayOwnedGamesUser(user_idOwned, callback){

        var sql = "SELECT games.title, games.game_id, games.thumbnail, platform.platformName FROM games INNER JOIN platform ON games.game_id=platform.gameIdP INNER JOIN ownedgames ON games.game_id=ownedgames.game_idOwned WHERE ownedgames.user_idOwned = ?";

        db.query(sql,[user_idOwned], callback)

    }

}

module.exports = OwnedGamesDB;