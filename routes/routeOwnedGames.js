"use strict"

const ownedGamesController = require('../controllers/ownedGamesController');

function routeOwnedGames(app){

    app.route('/addOwnedGames').post(ownedGamesController.addToOwnedGames);

    app.route('/displayOwnedGames/:user_idOwned').get(ownedGamesController.displayOwnedGamesUser);

}

module.exports = { routeOwnedGames }