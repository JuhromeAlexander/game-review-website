"use strict"

const reviewController = require('../controllers/reviewController');

function routeReview(app){

    app.route('/reviewGame/:game_idReview').get(reviewController.getGameReview);

    app.route('/reviewUser/:user_idReview').get(reviewController.getUserReview);

    app.route('/addReview').post(reviewController.addReview);

    app.route('/editReview/:game_idReview/:user_idReview').put(reviewController.updateReview);

    app.route('/deleteReview/:game_idReview/:user_idReview').delete(reviewController.deleteReview);

}

module.exports =  { routeReview }