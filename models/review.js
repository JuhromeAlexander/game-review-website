"use strict"

class Review {
    constructor(review_id, game_idReview, user_idReview, review, datePosted, rating){
        this.review_id = review_id;
        this.game_idReview = game_idReview;
        this.user_idReview = user_idReview;
        this.review = review;
        this.datePosted = datePosted;
        this.rating = rating;
    }

    getReview_id(){
        return this.review_id;
    }

    getGame_idReview(){
        return this.game_idReview;
    }

    getUser_idReview(){
        return this.user_idReview;
    }

    getReview(){
        return this.review;
    }

    getDatePosted(){
        return this.datePosted;
    }

    getRating(){
        return this.rating;
    }

    setReview_id(review_id){
        this.review_id = review_id;
    }

    setGame_idReview(game_idReview){
        this.game_idReview = game_idReview;
    }

    setUser_idReview(user_idReview){
        this.user_idReview = user_idReview;
    }

    setReview(review){
        this.review = review;
    }

    setDatePosted(datePosted){
        this.datePosted = datePosted;
    }

    setRating(rating){
        this.rating = rating;
    }
}

module.exports = Review;