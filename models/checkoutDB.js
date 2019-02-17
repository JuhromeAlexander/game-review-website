"use strict"

var db = require('../db-connection');

class CheckoutDB{

    displayCheckoutDetails(user_idCheckout, callback){

        var sql = "SELECT * FROM checkout WHERE user_idCheckout = ?";

        db.query(sql,[user_idCheckout], callback);

    }

    addToCheckout(checkout, callback){

        var sql = "INSERT INTO checkout (user_idCheckout, first_name, last_name, username, email, address, country, state, zipcode) VALUES (?,?,?,?,?,?,?,?,?)"

        db.query(sql,[checkout.getUser_idCheckout(), checkout.getFirst_name(), checkout.getLast_name(), checkout.getUsername(), checkout.getEmail(), checkout.getAddress(), checkout.getCountry(), checkout.getState(), checkout.getZipcode()],callback);

    }

}

module.exports = CheckoutDB;