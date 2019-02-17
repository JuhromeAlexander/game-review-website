"use strict"
const checkoutController = require('../controllers/checkoutController');

function routeCheckout(app){

    app.route('/checkout/:user_idCheckout').get(checkoutController.displayCheckoutDetails);

    app.route('/addCheckout').post(checkoutController.addToCheckout);
}

module.exports = { routeCheckout }