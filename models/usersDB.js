"use-strict";

var db = require('../db-connection');

class usersDB{

    getAllUsers(callback){

        var sql = "SELECT * FROM user";

        db.query(sql,callback)
    }

    authenticateWithDB(username, password, callback){

        var sql = "SELECT user_id FROM user WHERE username = ? AND password = ?";

        db.query(sql, [username,password], callback);
    }

    addUser(users, callback){

        var sql = "INSERT INTO user (username, email, description, name, password) VALUES (?,?,?,?,?)";

        db.query(sql,[users.getUsername(), users.getEmail(), users.getDescription(), users.getName(), users.getPassword()], callback);
    }

    updateUsers(users, callback){

        var sql = "UPDATE user SET username = ?, email = ?, description = ?, name = ?, password = ? WHERE user_id = ?";
        return db.query(sql, [users.getUsername(),users.getEmail(),users.getDescription(),users.getName(),users.getPassword(),users.getUserId()],callback)

    }

    deleteUsers(user_id, callback){

        var sql = "DELETE from user WHERE user_id = ?";
        return db.query(sql, [user_id], callback)

    }

    getUserDetails(user_id, callback){

        var sql = "SELECT * FROM user WHERE user_id = ?";
        return db.query(sql,[user_id], callback);

    }
}

module.exports = usersDB