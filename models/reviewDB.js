 "use strict"

 var db = require('../db-connection');

 class ReviewDB{

    getGameReview(game_idReview, callback){

        var sql = "SELECT * FROM reviews INNER JOIN user ON reviews.user_idReview=user.user_id WHERE game_idReview = ?";
        db.query(sql, [game_idReview] , callback);

    }

    getUserReview(user_idReview, callback){

        var sql = "SELECT * FROM reviews INNER JOIN user ON reviews.user_idReview=user.user_id INNER JOIN games ON reviews.game_idReview=games.game_id WHERE user_idReview = ?";
        db.query(sql, [user_idReview], callback);

    }

    addReview(review, callback){

        var sql = "INSERT INTO reviews (game_idReview, user_idReview, review, datePosted, rating) VALUES (?,?,?,?,?)";
        db.query(sql,[review.getGame_idReview(),review.getUser_idReview(),review.getReview(),review.getDatePosted(),review.getRating()], callback);

    }

    updateReview(review,rating,datePosted, game_idReview, user_idReview, callback){

        var sql = "UPDATE reviews SET review = ?, datePosted = ?, rating = ? WHERE user_idReview = ? AND game_idReview = ?"
        return db.query(sql, [review, datePosted, rating, user_idReview, game_idReview], callback)

    }

    deleteReview(game_idReview, user_idReview, callback){

        var sql = "DELETE FROM reviews WHERE game_idReview = ? AND user_idReview = ?";

        db.query(sql,[game_idReview,user_idReview], callback);

    }

 }

 module.exports = ReviewDB;