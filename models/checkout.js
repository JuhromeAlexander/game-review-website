"use strict"

class Checkout {
    constructor(checkout_id, user_idCheckout, first_name, last_name, username, email, address, country, state, zipcode){
        this.checkout_id = checkout_id;
        this.user_idCheckout = user_idCheckout;
        this.first_name = first_name;
        this.last_name = last_name;
        this.username = username;
        this.email = email;
        this.address = address;
        this.country = country;
        this.state = state;
        this.zipcode = zipcode;
    }

    getCheckout_id(){
        return this.checkout_id;
    }

    getUser_idCheckout(){
        return this.user_idCheckout;
    }

    getFirst_name(){
        return this.first_name;
    }

    getLast_name(){
        return this.last_name;
    }

    getUsername(){
        return this.username;
    }

    getEmail(){
        return this.email;
    }

    getAddress(){
        return this.address;
    }

    getCountry(){
        return this.country;
    }

    getState(){
        return this.state;
    }

    getZipcode(){
        return this.zipcode;
    }

    setUser_idCheckout(user_idCheckout){
        this.user_idCheckout = user_idCheckout;
    }

    setFirst_name(first_name){
        this.first_name = first_name;
    }

    setLast_name(last_name){
        this.last_name = last_name;
    }

    setUsername(username){
        this.username = username;
    }

    setEmail(email){
        this.email = email;
    }

    setAddress(address){
        this.address = address;
    }

    setCountry(country){
        this.country = country;
    }

    setState(state){
        this.state = state;
    }

    setZipcode(zipcode){
        this.zipcode = zipcode;
    }
}

module.exports = Checkout;