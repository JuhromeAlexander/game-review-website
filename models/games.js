"use-strict";

class Games{

    constructor(game_id, title, thumbnail, description, rating, releaseDate, developmentTeam, devMain, video, price, category){
        this.game_id = game_id
        this.title = title
        this.thumbnail = thumbnail
        this.description = description
        this.rating = rating
        this.releaseDate = releaseDate
        this.developmentTeam = developmentTeam
        this.devMain = devMain
        this.video = video
        this.price = price
        this.category = category

    }

    getGameId(){
        return this.game_id;
    }

    getTitle(){
        return this.title;
    }

    getThumbnail(){
        return this.thumbnail;
    }

    getDescription(){
        return this.description;
    }

    getRating(){
        return this.rating;
    }

    getReleaseDate(){
        return this.releaseDate;
    }

    getDevelopmentTeam(){
        return this.developmentTeam;
    }

    getDevMain(){
        return this.devMain;
    }

    getVideo(){
        return this.video;
    }

    getPrice(){
        return this.price;
    }

    getCategory(){
        return this.category;
    }

    //I dont think i need to generate setters, but Just in case
    //TODO Generate Setters
}

module.exports = Games;