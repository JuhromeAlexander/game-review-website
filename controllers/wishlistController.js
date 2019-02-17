"use strict"

const WishlistDB = require('../models/wishlistDB');
const Wishlist = require('../models/wishlist');

var wishlistDB = new WishlistDB();

function addToWishlist(request, respond){

    var wishlist = new Wishlist(null, request.body.user_id, request.body.game_idWish);

    wishlistDB.addToWishlist(wishlist,function(error,result){
        if(error){
            respond.json(error);
        }else{
            respond.json(result)
        }
    });
}

function removeFromWishlist(request, respond){

    var user_id = request.params.user_id;
    var game_idWish = request.params.game_idWish;

    wishlistDB.removeFromWishlist(game_idWish,user_id, function(error,result){
        if(error){
            respond.json(error);
        }else{
            respond.json(result);
        }
    });
}

function displayWishlistUser(request, respond){

    var user_id = request.params.user_id;

    wishlistDB.displayWishlistUser(user_id, function(error, result){
        if(error){
            respond.json(error);
        }else{
            respond.json(result);
        }
    });

}

module.exports = { addToWishlist, removeFromWishlist, displayWishlistUser }