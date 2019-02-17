"use-strict";

class Users{

	constructor(user_id, username, email, description, name, password) {
        
        this.user_id = user_id
        this.username = username
        this.email = email
        this.description = description
        this.name = name
        this.password = password

    }
    
    getUserId(){
        return this.user_id;
    }

    getUsername(){
        return this.username;
    }

    getEmail(){
        return this.email;
    }

    getDescription(){
        return this.description;
    }

    getName(){
        return this.name;
    }

    getPassword(){
        return this.password;
    }

    setUserID(user_id){
        this.user_id = user_id;
    }

    setUsername(username){
        this.username = username;
    }

    setEmail(email){
        this.email = email;
    }

    setDescription(description){
        this.description = description;
    }

    setName(name){
        this.name = name;
    }

    setPassword(password){
        this.password = password;
    }

}

module.exports = Users;