"use-strict";

class Wishlist{

    constructor(wishlist_id, user_id, game_idWish){

        this.wishlist_id = wishlist_id
        this.user_id = user_id
        this.game_idWish = game_idWish

    }

    getWishlistId(){
        return this.wishlist_id
    }

    getUser_id(){
        return this.user_id
    }

    getGame_idWish(){
        return this.game_idWish
    }

    setWishlistId(wishlist_id){
        this.wishlist_id = wishlist_id
    }

    setUser_id(user_id){
        this.user_id = user_id
    }

    setGame_idWish(game_idWish){
        this.game_idWish = game_idWish
    }


}

module.exports = Wishlist;