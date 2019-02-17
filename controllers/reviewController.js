"use strict"
const ReviewDB = require('../models/reviewDB');
const Review = require('../models/review');

var reviewDB = new ReviewDB();

function getGameReview(request, respond){

    var game_idReview = request.params.game_idReview;
    reviewDB.getGameReview(game_idReview, function(error,result){
        if(error){
            respond.json(error);
        }else{
            respond.json(result);
        }
    });

}

function getUserReview(request, respond){

    var user_idReview = request.params.user_idReview;
    reviewDB.getUserReview(user_idReview, function(error,result){
        if(error){
            respond.json(error);
        }else{
            respond.json(result);
        }
    });
}

function addReview(request, respond){

    var now = new Date();
    var review = new Review(null, request.body.game_idReview, request.body.user_idReview, request.body.review, now.toString(), request.body.rating)

    reviewDB.addReview(review, function(error, result){
        if(error){
            respond.json(error);
        }else{
            respond.json(result);
        }
    });

}

function updateReview(request, respond){

    var now = new Date();
    var game_idReview = request.params.game_idReview;
    var user_idReview = request.params.user_idReview;
    var review = request.body.review;
    var rating = request.body.rating;

    reviewDB.updateReview(review,rating,now.toString(),game_idReview,user_idReview, function(error,result){
        if(error){
            respond.json(error);
        }else{
            respond.json(result);
        }
    });
}

function deleteReview(request, respond){

    var game_idReview = request.params.game_idReview;
    var user_idReview = request.params.user_idReview;

    reviewDB.deleteReview(game_idReview,user_idReview, function(error,result){
        if(error){
            respond.json(error);
        }else{
            respond.json(result);
        }
    });

}

module.exports = { getGameReview, getUserReview, addReview, updateReview, deleteReview }