"use strict"
const wishlistController = require('../controllers/wishlistController');

function routeWishlist(app){

    app.route('/addWishlist').post(wishlistController.addToWishlist);

    app.route('/wishlist/:game_idWish/:user_id').delete(wishlistController.removeFromWishlist);

    app.route('/wishlist/:user_id').get(wishlistController.displayWishlistUser);

}

module.exports = { routeWishlist };