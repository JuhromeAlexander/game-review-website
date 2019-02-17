"use strict"

class Cart {

    constructor(cart_id, user_idCart, game_idCart, totalPrice, sessionId){
        this.cart_id = cart_id;
        this.user_idCart = user_idCart;
        this.game_idCart = game_idCart;
        this.totalPrice = totalPrice;
        this.sessionId = sessionId
    }

    getCartId(){
        return this.cart_id;
    }

    getUser_idCart(){
        return this.user_idCart;
    }

    getGame_idCart(){
        return this.game_idCart;
    }

    getTotalPrice(){
        return this.totalPrice;
    }

    getSessionId(){
        return this.sessionId;
    }

    setCart_id(cart_id){
        this.cart_id = cart_id;
    }

    setUser_idCart(user_idCart){
        this.user_idCart = user_idCart;
    }

    setGame_idCart(game_idCart){
        this.game_idCart = game_idCart;
    }

    setTotalPrice(totalPrice){
        this.totalPrice = totalPrice;
    }

    setSessionId(sessionId){
        this.sessionId = sessionId;
    }

}

module.exports = Cart;
