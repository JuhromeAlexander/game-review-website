"use strict"
const CartDB = require('../models/cartDB');
const Cart = require('../models/cart');

var cartDB = new CartDB();

function addGameToCart(request, respond){
   
    var cart = new Cart(null, request.body.user_idCart, request.body.game_idCart, request.body.totalPrice);
    cartDB.addGamesToCart(cart, function(error, result){

        if(error){
            respond.json(error);
        }else{
            respond.json(result);
        }
    });
}

function deleteFromCart(request, respond){

    var game_idCart = request.params.game_idCart;
    var user_idCart = request.params.user_idCart;
    
    cartDB.deleteFromCart(game_idCart,user_idCart, function(error, result){
        if(error){
            respond.json(error);
        }else{
            respond.json(result);
        }
    });

}

function displayCartUser(request, respond){

    var user_idCart = request.params.user_idCart;

    cartDB.displayCartUser(user_idCart, function(error,result){
        if(error){
            respond.json(error);
        }else{
            respond.json(result);
        }
    });

}

function deleteCartItemsUser(request, respond){

    var user_idCart = request.params.user_idCart;

    cartDB.deleteCartItemsUser(user_idCart, function(error,result){
        if(error){
            respond.json(error);
        }else{
            respond.json(result);
        }
    });

}

module.exports = { addGameToCart, deleteFromCart, displayCartUser, deleteCartItemsUser }