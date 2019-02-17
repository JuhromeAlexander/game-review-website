"use strict"

const usersController = require('../controllers/usersController');


function routeUsers(app){

    app.route('/users').get(usersController.getAllUsers);

    app.route('/users/:user_id').get(usersController.getUserDetails);

    app.route('/updateUser/:user_id').put(usersController.updateUsers)
        
    app.route('/deleteUser/:user_id').delete(usersController.deleteUser);

    app.route('/addUser').post(usersController.addUsers); 

    app.route('/login').post(usersController.authenticateByDB);
}

module.exports = { routeUsers }