"use strict";

var db = require('../db-connection')

class WishlistDB{

    addToWishlist(wishlist, callback){

        var sql = "INSERT INTO wishlist (user_id, game_idWish) VALUES (?,?)";
        db.query(sql,[wishlist.getUser_id(), wishlist.getGame_idWish()],callback);

    }

    removeFromWishlist(game_idWish,user_id, callback){

        var sql = "DELETE FROM wishlist WHERE (game_idWish = ? and user_id = ?)";

        return db.query(sql,[game_idWish, user_id], callback);

    }

    displayWishlistUser(user_id, callback){

        var sql = "SELECT games.title, games.game_id, games.thumbnail, platform.platformName FROM games INNER JOIN platform ON games.game_id=platform.gameIdP INNER JOIN wishlist ON games.game_id=wishlist.game_idWish WHERE wishlist.user_id = ?";

        db.query(sql, [user_id], callback);

    }

}

module.exports = WishlistDB;