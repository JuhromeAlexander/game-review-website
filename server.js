"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const routeGames = require('./routes/routeGames');
const routeUsers = require('./routes/routeUsers');
const routeWishlist = require('./routes/routeWishlist');
const routeCart = require('./routes/routeCart');
const routeReview = require('./routes/routeReview');
const routeCheckout = require('./routes/routeCheckout');
const routeOwnedGames = require('./routes/routeOwnedGames');

var app = express();
var host = "127.0.0.1";
var port = 8080;
var startPage = "index.html";

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routeGames.routeGames(app);
routeUsers.routeUsers(app);
routeWishlist.routeWishlist(app);
routeCart.routeCart(app);
routeReview.routeReview(app);
routeCheckout.routeCheckout(app);
routeOwnedGames.routeOwnedGames(app);

function gotoIndex(req, res) {
    console.log(req.params);
    res.sendFile(__dirname + "/" + startPage);
}

app.get("/" + startPage, gotoIndex);

app.route("/");

var server = app.listen(port, host, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});
