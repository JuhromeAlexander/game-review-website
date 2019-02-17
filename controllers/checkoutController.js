"use strict"

const CheckoutDB = require('../models/checkoutDB');
const Checkout = require('../models/checkout');


var checkoutDB = new CheckoutDB();

function displayCheckoutDetails(request, respond){
    var user_idCheckout = request.params.user_idCheckout;

    checkoutDB.displayCheckoutDetails(user_idCheckout, function(error, result){
        if(error){
            respond.json(error);
        }else{
            respond.json(result);
        }
    });
}

function addToCheckout(request, respond){

    var checkout = new Checkout(null, request.body.user_idCheckout, request.body.first_name, request.body.last_name, request.body.username, request.body.email, request.body.address, request.body.country, request.body.state, request.body.zipcode);

    checkoutDB.addToCheckout(checkout, function(error, result){
        if(error){
            respond.json(error);
        }else{
            respond.json(result);
        }
    });

}

module.exports = { displayCheckoutDetails, addToCheckout }