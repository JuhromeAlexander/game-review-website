"use strict"

class OwnedGames{
    constructor(owned_id, game_idOwned, user_idOwned){
        this.owned_id = owned_id;
        this.game_idOwned = game_idOwned;
        this.user_idOwned = user_idOwned;
    }

    getOwned_id(){
        return this.owned_id;
    }

    getGame_idOwned(){
        return this.game_idOwned;
    }

    getUser_idOwned(){
        return this.user_idOwned;
    }

    setGame_idOwned(game_idOwned){
        this.game_idOwned = game_idOwned;
    }

    setUser_idOwned(user_idOwned){
        this.user_idOwned = user_idOwned;
    }
}

module.exports = OwnedGames;