"use strict"
const cartController = require('../controllers/cartController');

function routeCart(app){

    app.route('/cart').post(cartController.addGameToCart);
    
    app.route('/cart/:game_idCart/:user_idCart').delete(cartController.deleteFromCart);

    app.route('/cart/:user_idCart').get(cartController.displayCartUser);

    app.route('/deleteCartUser/:user_idCart').delete(cartController.deleteCartItemsUser);
}

module.exports = { routeCart };