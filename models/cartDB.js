"use strict";

var db = require('../db-connection');

class CartDB{

    addGamesToCart(cart, callback){

        var sql = "INSERT INTO cart (user_idCart, game_idCart, totalPrice) VALUES (?,?,?)";

        db.query(sql, [cart.getUser_idCart(), cart.getGame_idCart(), cart.getTotalPrice()], callback);

    }

    deleteFromCart(game_idCart,user_idCart, callback){

        var sql = "DELETE FROM cart WHERE (game_idCart = ? and user_idCart = ?)";

        return db.query(sql, [game_idCart, user_idCart], callback);

    }

    displayCartUser(user_idCart, callback){

        var sql = "SELECT * FROM games INNER JOIN cart ON games.game_id=cart.game_idCart WHERE user_idCart = ?";

        db.query(sql, [user_idCart], callback);

    }

    deleteCartItemsUser(user_idCart,callback){

        var sql = "DELETE FROM cart WHERE user_idCart = ?";

        db.query(sql, [user_idCart], callback);

    }

}

module.exports = CartDB;