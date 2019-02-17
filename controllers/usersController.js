"use strict"
const UsersDB = require('../models/usersDB');
const User = require('../models/users');

var usersDB = new UsersDB();

function getAllUsers(request, respond){
    usersDB.getAllUsers(function(error,result){
        if(error){
            respond.json(error);
        }else{
            respond.json(result);
        }
    });
}

function addUsers(request, respond){
    var user = new User(null, request.body.username, request.body.email, request.body.description, request.body.name, request.body.password);
    
    usersDB.addUser(user, function(error, result){

        if (error){
            respond.json(error);
        }else{
            respond.json(result);
        }
    })

}

function updateUsers(request,respond){

    var user = new User(parseInt(request.params.user_id), request.body.username, request.body.email, request.body.description, request.body.name, request.body.password);

    usersDB.updateUsers(user, function(error,result){
        if(error){
            respond.json(error);
        }else{
            respond.json(result);
        }
    });
}

function deleteUser(request, respond){

    var userId = request.params.user_id;
    usersDB.deleteUsers(userId, function(error, result){
        if(error){
            respond.json(error);
        }else{
            respond.json(result);
        }
    })
}

function prepareMessage(msg){

    var obj = {"message": msg};

    return obj;

}

function authenticateByDB(request,respond){

    var usernameInput = request.body.username; 
    var passwordInput = request.body.password;
    var msg = "";

    usersDB.authenticateWithDB(usernameInput, passwordInput, function(error,result){
        if(error){
            respond.json(error);
        }else{
            if(result.length > 0){

                msg = "1"
                console.log(respond)

            }else{

                msg = "0"
                console.log(respond)
            }

            respond.json(prepareMessage(msg))
        }
    });
}

function getUserDetails(request,respond){

    var userIdInput = request.params.user_id;

    usersDB.getUserDetails(userIdInput, function(error,result){
        if(error){
            respond.json(error);
        }else{
            respond.json(result);
        }
    });

}

module.exports = { getAllUsers, addUsers, updateUsers, deleteUser, prepareMessage, authenticateByDB, getUserDetails }