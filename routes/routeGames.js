"use strict"
const gamesController = require('../controllers/gamesController');
var db = require('../db-connection'); //Reference to db-connection.js


function routeGames(app){

    app.route('/games').get(gamesController.getAllGames);

    app.route('/games/:game_id').get(gamesController.getGameInfo);

    app.route('/games/genre/:game_id').get(gamesController.getGameGenre);

    app.route('/games/platform/:game_id').get(gamesController.getGamePlatform);

    app.route('/search').post(gamesController.searchGamesByTitle);

    app.route('/gamesps4').get(gamesController.getGamesByPlatformPs4);

    app.route('/gamesxbox').get(gamesController.getGamesByPlatformXbox);

    app.route('/gamespc').get(gamesController.getGamesByPlatformPc);

    app.route('/gamesothers').get(gamesController.getGamesByPlatformOthers);

}

module.exports = { routeGames }