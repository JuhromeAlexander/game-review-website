//XMLHTTPREQUEST FUNCTIONS
function getGameTableData(){
    var request = new XMLHttpRequest();
    request.open('GET',game_url,true);

    request.onload = function(){

        games_array = JSON.parse(request.responseText);
        displayTable();
    
    }; 

    request.send();
}

function getGameTableDataPlatform(){
    var request = new XMLHttpRequest();

    var data = sessionStorage.getItem('platform')
    switch(data){
        case 'pc':
            game_url = '/gamespc';
            request.open('GET',game_url,true);
            request.onload = function(){
                platformgame_array = JSON.parse(request.responseText);
                platformGames(data);
            };
            request.send();
            break;
        case 'xbox':
            game_url = '/gamesxbox';
            request.open('GET',game_url,true);
            request.onload = function(){
                platformgame_array = JSON.parse(request.responseText);
                platformGames(data);
            };
            request.send();
            break;
        case 'others':
            game_url = '/gamesothers';
            request.open('GET',game_url,true);
            request.onload = function(){
                platformgame_array = JSON.parse(request.responseText);
                platformGames(data);
            };
            request.send();
            break;

        case 'ps4':
            game_url = '/gamesps4';
            request.open('GET',game_url,true);
            request.onload = function(){
                platformgame_array = JSON.parse(request.responseText);
                platformGames(data);
            };
            request.send();
            break;
    }
    
}

function getAllGames(){
    var request = new XMLHttpRequest();
    game_url = '/games'
    request.open('GET', game_url,true);

    request.onload = function(){
        games_array = JSON.parse(request.responseText);

        //Set method here
        displayAllGamesCard();
    };

    request.send();
}

function getAllGamesNew(){
    var request = new XMLHttpRequest();
    game_url = '/games'
    request.open('GET', game_url,true);

    request.onload = function(){
        games_array = JSON.parse(request.responseText);

        var totalGames = games_array.length;

        for (var count = 0; count < totalGames; count++){
            if(games_array[count].category == "new"){
                allnew_array.push(games_array[count]);
                console.log('Outside Second For Loop');
            }
        }

        //Set method here
        displayAllGamesNew();
    };

    request.send();
}

function getAllGamesHot(){
    var request = new XMLHttpRequest();
    game_url = '/games'
    request.open('GET', game_url,true);

    request.onload = function(){
        games_array = JSON.parse(request.responseText);
        var totalGames = games_array.length;

        for (var count = 0; count < totalGames; count++){
            if(games_array[count].category == "hot"){
                allhot_array.push(games_array[count]);
                console.log('Outside Second For Loop');
            }
        }
        //Set method here
        displayAllGamesHot();
    };

    request.send();
}

function getAllGamesPop(){
    var request = new XMLHttpRequest();
    game_url = '/games'
    request.open('GET', game_url,true);

    request.onload = function(){
        games_array = JSON.parse(request.responseText);

        var totalGames = games_array.length;

        for (var count = 0; count < totalGames; count++){
            if(games_array[count].category == "popular"){
                allpop_array.push(games_array[count]);
                console.log('Outside Second For Loop');
            }
        }
        //Set method here
        displayAllGamesPop();
    };

    request.send();
}

function gameInfoScreen(){
    var platformRequest = new XMLHttpRequest();
    var genreRequest = new XMLHttpRequest();
    var gameInfoRequest = new XMLHttpRequest();
    
    gameId = sessionStorage.getItem('gameId');

    platform_url = '/games/platform/' + gameId;
    genre_url = '/games/genre/' + gameId;
    games_url = '/games/' + gameId;

    platformRequest.open('GET', platform_url, true);
    genreRequest.open('GET',genre_url, true);
    gameInfoRequest.open('GET', games_url, true);

    platformRequest.onload = function(){
        platform_array = JSON.parse(platformRequest.responseText);

        //Method Here
        showGamePlatform();
    }

    genreRequest.onload = function(){
        genre_array = JSON.parse(genreRequest.responseText);

        //Insert Method Here
        showGameGenre();
    }

    gameInfoRequest.onload = function(){
        game_info_array = JSON.parse(gameInfoRequest.responseText);

        showGameInfo();
    }

    platformRequest.send();
    genreRequest.send();
    gameInfoRequest.send();

    getReviewGame();

    
}

function getWishlist(){
    var wishlistRequest = new XMLHttpRequest();

    var userId = sessionStorage.getItem('userId');
    var wishlist_route = '/wishlist/' + userId;

    wishlistRequest.open('GET', wishlist_route, true);

    wishlistRequest.onload = function(){
        wishlist_array = JSON.parse(wishlistRequest.responseText);

        displayWishlistUser();
    }

    wishlistRequest.send();
}

function getWishlistAll(){
    var wishlistRequest = new XMLHttpRequest();

    var userId = sessionStorage.getItem('userId');
    var wishlist_route = '/wishlist/' + userId;

    wishlistRequest.open('GET', wishlist_route, true);

    wishlistRequest.onload = function(){
        wishlist_array = JSON.parse(wishlistRequest.responseText);

        displayWishlistUserAll();
    }

    wishlistRequest.send();
}

function addToWishlist(){

    var checkLogin = authentication();

    if (checkLogin == true){
        var addwishlistrequest = new XMLHttpRequest();

        var userIdWish = sessionStorage.getItem('userId');
        var gameIdWish = sessionStorage.getItem('gameId');

        var addwishlist_url = '/addWishlist';

        var addreview = new Object();

        addreview.user_id = userIdWish;
        addreview.game_idWish = gameIdWish;

        addwishlistrequest.open('POST', addwishlist_url, true);
        addwishlistrequest.setRequestHeader("Content-Type", "application/json");

        addwishlistrequest.onload = function(){

            if(this.status === 200){
                alert("Game Added to Wishlist!");
                $('#addWish').addClass('invisible');
                $('#removeWish').removeClass('invisible');
            }

        }

        addwishlistrequest.send(JSON.stringify(addreview));

    }else{
        alert("Must Be Logged In to Add Games to Wishlist. Redirecting...");
        redirectToLogin();
    }
}

function deleteFromWishlist(){
    var checkLogin = authentication();

    if (checkLogin == true){
        var removefromwishlistrequest = new XMLHttpRequest();

        var userIdWish = sessionStorage.getItem('userId');
        var gameIdWish = sessionStorage.getItem('gameId');

        var removewish_url = '/wishlist/' + gameIdWish +'/' + userIdWish;

        removefromwishlistrequest.open('DELETE', removewish_url, true);

        removefromwishlistrequest.onload = function(){
            if (this.status === 200){
                alert("Successfully Removed From Wishlist!");
            }else{
                alert('Game is Not in Wishlist');
            }
        }

        removefromwishlistrequest.send();
    }
}

function getOwnedGames(){

    var ownedgamesrequest = new XMLHttpRequest();

    var userIdOwned = sessionStorage.getItem('userId');

    var ownedgames_url = '/displayOwnedGames/' + userIdOwned;

    ownedgamesrequest.open('GET', ownedgames_url, true);

    ownedgamesrequest.onload = function(){
        if (this.status === 200){
            ownedgames_array = JSON.parse(ownedgamesrequest.responseText);

            displayOwnedGamesUser();
        }
    }
    ownedgamesrequest.send();
    
}

function getOwnedGamesAll(){

    var ownedgamesrequest = new XMLHttpRequest();

    var userIdOwned = sessionStorage.getItem('userId');

    var ownedgames_url = '/displayOwnedGames/' + userIdOwned;

    ownedgamesrequest.open('GET', ownedgames_url, true);

    ownedgamesrequest.onload = function(){
        if (this.status === 200){
            ownedgames_array = JSON.parse(ownedgamesrequest.responseText);
            displayOwnedGamesUserAll();
        }
    }
    ownedgamesrequest.send();
    
}

function addToCart(){

    var checkLogin = authentication()

    if (checkLogin == true){

        var addcartrequest = new XMLHttpRequest();

        var addcart_url = '/cart';
        var cartObject = new Object()

        cartObject.user_idCart = sessionStorage.getItem('userId');
        cartObject.game_idCart = sessionStorage.getItem('gameId');
        cartObject.totalPrice = game_info_array[0].price;

        console.log(cartObject.user_idCart, cartObject.game_idCart, cartObject.totalPrice);

        addcartrequest.open('POST', addcart_url, true);
        addcartrequest.setRequestHeader("Content-Type", "application/json");

        addcartrequest.onload = function(){
            alert('Successfully Added To Cart!');
        }

        addcartrequest.send(JSON.stringify(cartObject));



    }else{
        alert("Must Be Logged In to Add Games to Cart. Redirecting...");
        redirectToLogin();
    }

}

function removeFromCart(){

    var checkLogin = authentication();

    if(checkLogin == true){

        var removefromcartrequest = new XMLHttpRequest();

        var gameIdRmCart = sessionStorage.getItem('gameId');
        var userIdRmCart = sessionStorage.getItem('userId');

        var removecart_url = '/cart/' + gameIdRmCart + '/' + userIdRmCart;

        removefromcartrequest.open('DELETE', removecart_url, true);

        removefromcartrequest.onload = function(){

            if (this.status === 200){

                alert('Successfully Removed From Cart')
        
            }else{
                alert('Game Is Not in Cart')
            }

        }

        removefromcartrequest.send()

    }else{
        alert("Must Be Logged In to Add Games to Cart. Redirecting...");
        redirectToLogin();   
    }
}

function displayCart(){

    var checkLogin = authentication();
    console.log('Test 2 Display Cart')
    console.log(checkLogin)
    if(checkLogin==true){

        var displaycartrequest = new XMLHttpRequest();

        var userIdDisCart = sessionStorage.getItem('userId');

        var displaycart_url = '/cart/' + userIdDisCart;

        displaycartrequest.open('GET', displaycart_url, true);

        displaycartrequest.onload = function(){
            if(this.status === 200){
                cart_array = JSON.parse(displaycartrequest.responseText);
                //Set Function For Cart Here
                setCartDetails();
                console.log('Cart Displayed')
            }
        }

        displaycartrequest.send();
    }else{
        alert('Must Register/Log In to access this page. Redirecting...');
        redirectToLogin();
    }
}

function displayCheckout(){

    var checkLogin = authentication();
    console.log('Test 1 Display Checkout')
    console.log(checkLogin)
    if(checkLogin == true){
        console.log('Checkout Login == true')
        var displaycheckoutrequest = new XMLHttpRequest();

        var userIdCheck = sessionStorage.getItem('userId');
        console.log(userIdCheck);

        var displaycheck_url = '/checkout/' + userIdCheck;

        displaycheckoutrequest.open('GET', displaycheck_url, true);

        displaycheckoutrequest.onload = function(){
            console.log('Checkout OnLoad')
            if (this.status === 200){
                checkout_array = JSON.parse(displaycheckoutrequest.responseText);
                console.log('Test 2 Checkout')
                console.log(checkout_array);
                if(checkout_array[0] === undefined || checkout_array[0] === null){
                    document.getElementById('checkoutFirstName').value = '';
                    document.getElementById('checkoutLastName').value = '';
                    document.getElementById('checkoutUsername').value = '';
                    document.getElementById('checkoutEmail').value = '';
                    document.getElementById('checkoutAddress').value = '';
                    document.getElementById('checkoutCountry').value = '';
                    document.getElementById('checkoutState').value = '';
                    document.getElementById('checkoutZipcode').value =  '';         
                }else{
                    setCheckoutDetails();
                    console.log('Checkout Details Displayed')       
                }
            }else{
                console.log('Display Checkout Not Working')
            }
        }

        displaycheckoutrequest.send();
    }
}

function addCheckout(){

    var checkLogin = authentication();

    if (checkLogin == true){

        if($('#checkoutSaveBillingAddress').is(':checked')){
            console.log('Thingy is saved');
            var addcheckoutrequest = new XMLHttpRequest();

            var addcheckObj = new Object();
            addcheckObj.user_idCheckout = sessionStorage.getItem('userId');
            addcheckObj.first_name = document.getElementById('checkoutFirstName').value;
            addcheckObj.last_name = document.getElementById('checkoutLastName').value;
            addcheckObj.username = document.getElementById('checkoutUsername').value;
            addcheckObj.email = document.getElementById('checkoutEmail').value;
            addcheckObj.address = document.getElementById('checkoutAddress').value;
            addcheckObj.country = document.getElementById('checkoutCountry').value;
            addcheckObj.state = document.getElementById('checkoutState').value;
            addcheckObj.zipcode = document.getElementById('checkoutZipcode').value;

            var addcheck_url = '/addCheckout'

            addcheckoutrequest.open('POST', addcheck_url, true);
            addcheckoutrequest.setRequestHeader("Content-Type", "application/json");

            addcheckoutrequest.onload = function(){
                if(this.status === 200){
                    console.log('Checkout Information Saved');
                }
            };
            addcheckoutrequest.send(JSON.stringify(addcheckObj));
        }
    }
}

function checkoutOnload(){
    displayCheckout();
    displayCart();
}

function checkoutOnClick(){
    console.log('I actually work');
    addCheckout();
    addOwnedGames();
    window.setTimeout(deleteWholeUserCart(), 2000);
    alert('Games Successfully Purchased')
}

function deleteWholeUserCart(){

    var checkLogin = authentication();

    if (checkLogin == true){
        var deletewholeuserrequest = new XMLHttpRequest();

        var userIdDelCart = sessionStorage.getItem('userId');

        var deletewholeuser_url = '/deleteCartUser/' + userIdDelCart;

        deletewholeuserrequest.open('DELETE', deletewholeuser_url, true);

        deletewholeuserrequest.onload = function(){

            if(this.status===200){
                console.log('Cart Deleted')
            }
        }

        deletewholeuserrequest.send();
    }
}

function addOwnedGames(){

    var checkLogin = authentication();

    if (checkLogin == true){

        for(var count = 0; count < cart_array.length; count++){
            var addownedgamerequest = new XMLHttpRequest();

            var addOwnedObj = new Object();
    
            addOwnedObj.game_idOwned = cart_array[count].game_idCart;
            addOwnedObj.user_idOwned = cart_array[count].user_idCart;
    
            var addowned_url = '/addOwnedGames';
    
            addownedgamerequest.open('POST', addowned_url, true);
            addownedgamerequest.setRequestHeader("Content-Type", "application/json");
    
            addownedgamerequest.onload = function(){
                console.log("Games Successfully Purchased")
            }
    
            addownedgamerequest.send(JSON.stringify(addOwnedObj));
        }
        
    }else{
        alert('You Need to be Logged In/Registered to purchase games. Redirecting...');
        redirectToLogin();
    }
}

function searchGameTitle(){
    var searchrequest = new XMLHttpRequest();

    var userInputValue = sessionStorage.getItem('searchInput');
    console.log(userInputValue);
    var searchInput = new Object();

    searchInput.userInput = userInputValue;

    var search_url ='/search';

    searchrequest.open('POST', search_url, true);

    searchrequest.setRequestHeader("Content-Type", "application/json");

    searchrequest.onload = function(){
        if (this.status === 200){
            searchresults_array = JSON.parse(searchrequest.responseText);
            console.log(searchresults_array);
            console.log('Search Success')
            displaySearchResults();
            
        }
    }

    searchrequest.send(JSON.stringify(searchInput));
}

//Dirty Work Functions
function displayAllGamesNew(){
    var newgamerow = document.getElementById('newGamesRow');

    var totalNewGames = allnew_array.length;

    console.log(games_array);
    
    newgamerow.innerHTML = "";

    for (var countNew = 0; countNew < totalNewGames; countNew++){
        console.log('Second For Loop')
        var newgamerowhtml = '<div class="col-md-3 col-6 col-margin">\
                                    <div class="card">\
                                        <img class="card-img-top thumbnail img-thumbnail img-fluid" src=' + allnew_array[countNew].thumbnail + ' />\
                                        <div class="card-body">\
                                            <div class="card-title">' + allnew_array[countNew].title + ' </div>\
                                            <a href="gameinfo.html" class="btn btn-dark" data-target="gameInfo" item="' + countNew + '" onclick="getGameId(this)" >See More</a>\
                                        </div>\
                                    </div>\
                                </div>'

        newgamerow.insertAdjacentHTML('beforeend', newgamerowhtml);

        console.log('End of Second For Loop')
    }
    console.log(allnew_array);
}

function displayAllGamesHot(){
    var hotgamerow = document.getElementById('hotGamesRow');

    var totalhotGames = allhot_array.length;

    console.log(games_array);
    
    hotgamerow.innerHTML = "";

    for (var counthot = 0; counthot < totalhotGames; counthot++){
        console.log('Second For Loop')
        var hotgamerowhtml = '<div class="col-md-3 col-6 col-margin">\
                                    <div class="card">\
                                        <img class="card-img-top thumbnail img-thumbnail img-fluid" src=' + allhot_array[counthot].thumbnail + ' />\
                                        <div class="card-body">\
                                            <div class="card-title">' + allhot_array[counthot].title + ' </div>\
                                            <a href="gameinfo.html" class="btn btn-dark" data-target="gameInfo" item="' + counthot + '" onclick="getGameId(this)" >See More</a>\
                                        </div>\
                                    </div>\
                                </div>'

        hotgamerow.insertAdjacentHTML('beforeend', hotgamerowhtml);

        console.log('End of Second For Loop')
    }
}

function displayAllGamesPop(){
    var popgamerow = document.getElementById('popGamesRow');

    var totalpopGames = allpop_array.length;

    console.log(games_array);
    
    popgamerow.innerHTML = "";

    for (var countpop = 0; countpop < totalpopGames; countpop++){
        console.log('Second For Loop')
        var popgamerowhtml = '<div class="col-md-3 col-6 col-margin">\
                                    <div class="card">\
                                        <img class="card-img-top thumbnail img-thumbnail img-fluid" src=' + allpop_array[countpop].thumbnail + ' />\
                                        <div class="card-body">\
                                            <div class="card-title">' + allpop_array[countpop].title + ' </div>\
                                            <a href="gameinfo.html" class="btn btn-dark" data-target="gameInfo" item="' + countpop + '" onclick="getGameId(this)" >See More</a>\
                                        </div>\
                                    </div>\
                                </div>'

        popgamerow.insertAdjacentHTML('beforeend', popgamerowhtml);

        console.log('End of Second For Loop')
    }
}

function setCartDetails(){

    var carttable = document.getElementById('cartRow');

    var totalGamesCart = cart_array.length;
    document.getElementById('checkoutCartItems').textContent = totalGamesCart;

    carttable.innerHTML = "";

    var totalPrice = 0

    for(var count=0; count < totalGamesCart; count++){

        var carttablehtml = '<div class="card col-md-12" style="width:100%; padding:5px;">\
                                <div class="card-body">\
                                    <div class="card-text" style="color:black;">\
                                        <p id="cartGameTitle">' + cart_array[count].title + ' </p>\
                                        <p id="cartGamePrice">' + cart_array[count].price + ' </p>\
                                    </div>\
                                </div>\
                            </div>'

        var price = cart_array[count].price;

        totalPrice = parseFloat(totalPrice) + parseFloat(price);

        carttable.insertAdjacentHTML('beforeend', carttablehtml);

    }

    document.getElementById('cartTotalPrice').textContent = parseFloat(totalPrice).toFixed(2);

}

function setCheckoutDetails(){
    document.getElementById('checkoutFirstName').value = checkout_array[0].first_name;
    document.getElementById('checkoutLastName').value = checkout_array[0].last_name;
    document.getElementById('checkoutUsername').value = checkout_array[0].username;
    document.getElementById('checkoutEmail').value = checkout_array[0].email;
    document.getElementById('checkoutAddress').value = checkout_array[0].address;
    document.getElementById('checkoutCountry').value = checkout_array[0].country;
    document.getElementById('checkoutState').value = checkout_array[0].state;
    document.getElementById('checkoutZipcode').value = checkout_array[0].zipcode;
}

function displayTable(){
    displayGameHot();
    displayGameNew();
    displayGamePop();
}

function displayGameNew(){
    var new1 = document.getElementById("newGame1");
    var new2 = document.getElementById("newGame2");
    var new3 = document.getElementById("newGame3");
    var new4 = document.getElementById("newGame4");

    totalGames = games_array.length;

    for (var count = 0; count < totalGames; count++){
        if(games_array[count].category == "new"){
            newgameTable_array.push(games_array[count])
        }
    }
    
    var newGame1HTML = '<div class= "" style="float:none; margin:0 auto;">\
                        <div>\
                            <a id="games" href="gameinfo.html" item="0" onclick="getGameIdNew(this)">\
                                <img class="thumbnail img-fluid img-thumbnail" src=' + newgameTable_array[0].thumbnail + ' />\
                            </a>\
                        </div>\
                    </div>';

    var newGame2HTML = '<div class= "" style="float:none; margin:0 auto;">\
                        <div>\
                            <a id="games" href="gameinfo.html" item="1" onclick="getGameIdNew(this)">\
                                <img class="thumbnail img-fluid img-thumbnail" src=' + newgameTable_array[1].thumbnail + ' />\
                            </a>\
                        </div>\
                    </div>';

    var newGame3HTML = '<div class= "" style="float:none; margin:0 auto;">\
                        <div>\
                            <a id="games" href="gameinfo.html" item="2" onclick="getGameIdNew(this)">\
                                <img class="thumbnail img-fluid img-thumbnail" src=' + newgameTable_array[2].thumbnail + ' />\
                            </a>\
                        </div>\
                    </div>';


    var newGame4HTML = '<div class= "" style="float:none; margin:0 auto;">\
                        <div>\
                            <a id="games" href="gameinfo.html" item="3" onclick="getGameIdNew(this)">\
                                <img class="thumbnail img-fluid img-thumbnail" src=' + newgameTable_array[3].thumbnail + ' />\
                            </a>\
                        </div>\
                    </div>';

    new1.innerHTML = newGame1HTML;
    new2.innerHTML = newGame2HTML;
    new3.innerHTML = newGame3HTML;
    new4.innerHTML = newGame4HTML;

}

function displayGameHot(){
    var hot1 = document.getElementById("hotGame1");
    var hot2 = document.getElementById("hotGame2");
    var hot3 = document.getElementById("hotGame3");
    var hot4 = document.getElementById("hotGame4");

    totalGames = games_array.length;

    for (var count = 0; count < totalGames; count++){
        if(games_array[count].category == "hot"){
            
            hotgameTable_array.push(games_array[count]);
        }
    }
    
    var hotGame1HTML = '<div class= "" style="float:none; margin:0 auto;">\
                        <div>\
                            <a id="games" href="gameinfo.html" item="0" onclick="getGameIdHot(this)">\
                                <img class="thumbnail img-fluid img-thumbnail" src=' + hotgameTable_array[0].thumbnail + ' />\
                            </a>\
                        </div>\
                    </div>';

    var hotGame2HTML = '<div class= "" style="float:none; margin:0 auto;">\
                        <div>\
                            <a id="games" href="gameinfo.html" item="1" onclick="getGameIdHot(this)">\
                                <img class="thumbnail img-fluid img-thumbnail" src=' + hotgameTable_array[1].thumbnail + ' />\
                            </a>\
                        </div>\
                    </div>';

    var hotGame3HTML = '<div class= "" style="float:none; margin:0 auto;">\
                        <div>\
                            <a id="games" href="gameinfo.html" item="2" onclick="getGameIdHot(this)">\
                                <img class="thumbnail img-fluid img-thumbnail" src=' + hotgameTable_array[2].thumbnail + ' />\
                            </a>\
                        </div>\
                    </div>';


    var hotGame4HTML = '<div class= "" style="float:none; margin:0 auto;">\
                        <div>\
                            <a id="games" href="gameinfo.html" item="3" onclick="getGameIdHot(this)">\
                                <img class="thumbnail img-fluid img-thumbnail" src=' + hotgameTable_array[3].thumbnail + ' />\
                            </a>\
                        </div>\
                    </div>';

    hot1.innerHTML = hotGame1HTML;
    hot2.innerHTML = hotGame2HTML;
    hot3.innerHTML = hotGame3HTML;
    hot4.innerHTML = hotGame4HTML;

}

function displayGamePop(){
    var pop1 = document.getElementById("popGame1");
    var pop2 = document.getElementById("popGame2");
    var pop3 = document.getElementById("popGame3");
    var pop4 = document.getElementById("popGame4");

    totalGames = games_array.length;

    for (var count = 0; count < totalGames; count++){
        if(games_array[count].category == "popular"){
            
            popgameTable_array.push(games_array[count])
        }
    }
    
    var popGame1HTML = '<div class= "" style="float:none; margin:0 auto;">\
                        <div>\
                            <a id="games" href="gameinfo.html" item="0" onclick="getGameIdPop(this)">\
                                <img class="thumbnail img-fluid img-thumbnail" src=' + popgameTable_array[0].thumbnail + ' />\
                            </a>\
                        </div>\
                    </div>';

    var popGame2HTML = '<div class= "" style="float:none; margin:0 auto;">\
                        <div>\
                            <a id="games" href="gameinfo.html" item="1" onclick="getGameIdPop(this)">\
                                <img class="thumbnail img-fluid img-thumbnail" src=' + popgameTable_array[1].thumbnail + ' />\
                            </a>\
                        </div>\
                    </div>';

    var popGame3HTML = '<div class= "" style="float:none; margin:0 auto;">\
                        <div>\
                            <a id="games" href="gameinfo.html" item="2" onclick="getGameIdPop(this)">\
                                <img class="thumbnail img-fluid img-thumbnail" src=' + popgameTable_array[2].thumbnail + ' />\
                            </a>\
                        </div>\
                    </div>';


    var popGame4HTML = '<div class= "" style="float:none; margin:0 auto;">\
                        <div>\
                            <a id="games" href="gameinfo.html" item="3" onclick="getGameIdPop(this)">\
                                <img class="thumbnail img-fluid img-thumbnail" src=' + popgameTable_array[3].thumbnail + ' />\
                            </a>\
                        </div>\
                    </div>';

    pop1.innerHTML = popGame1HTML;
    pop2.innerHTML = popGame2HTML;
    pop3.innerHTML = popGame3HTML;
    pop4.innerHTML = popGame4HTML;

}

function platformGames(platform){

    var platformrow = document.getElementById('platformGamesRow');

    var totalPlatformGames = platformgame_array.length;

    platformrow.innerHTML = "";

    document.getElementById('namePlatform').textContent = platform;

    for (var count = 0; count < totalPlatformGames; count++){

        var platformrowhtml = '<div class="col-md-3 col-6 col-margin">\
                                    <div class="card">\
                                        <img class="card-img-top thumbnail img-thumbnail img-fluid" src=' + platformgame_array[count].thumbnail + ' />\
                                        <div class="card-body">\
                                            <div class="card-title">' + platformgame_array[count].title + ' </div>\
                                            <a href="gameinfo.html" class="btn btn-dark" data-target="gameInfo" item="' + count + '" onclick="getGameIdPlatform(this)" >See More</a>\
                                        </div>\
                                    </div>\
                                </div>'

        platformrow.insertAdjacentHTML('beforeend', platformrowhtml);

    }

    

}

function sessionLoad(){
    
    platformName = sessionStorage.getItem('platform');
    document.getElementById('namePlatform').innerHTML = platformName;
    sessionStorage.removeItem('platform');
    
}

function displayAllGamesCard(){
    var allgame = document.getElementById('allGamesRow');

    totalGames = games_array.length;
    allgame.innerHTML = "";
    for(var count=0; count < totalGames; count++){
        
        var allGameHtml = '<div class="col-md-3 col-6 col-margin">\
                                <div class="card">\
                                    <img class="card-img-top thumbnail img-thumbnail img-fluid" src=' + games_array[count].thumbnail + ' />\
                                    <div class="card-body">\
                                        <div class="card-title">' + games_array[count].title + ' </div>\
                                        <a href="gameinfo.html" class="btn btn-dark" data-target="gameInfo" item="' + count + '" onclick="getGameId(this)" >See More</a>\
                                    </div>\
                                </div>\
                            </div>'
        allgame.insertAdjacentHTML('beforeend', allGameHtml);
    }
}

function displayWishlistUser(){
    //TODO
    var wishlist = document.getElementById('wishlistTable');
    
    wishlist.innerHTML = "";
    for (var count = 0; count < 2; count++){
        if(wishlist_array[count].game_id !== undefined || wishlist_array[count].game_id !== null){
            var wishlistHtml = '<div class="col-md-6 col-margin">\
                                    <div class="card">\
                                        <img class="card-img-top thumbnail img-thumbnail img-fluid" src=' + wishlist_array[count].thumbnail + ' />\
                                        <div class="card-body">\
                                            <div class="card-title">' + wishlist_array[count].title + ' </div>\
                                            <a href="gameinfo.html" class="btn btn-dark" data-target="gameInfo" item="' + count + '" onclick="getGameIdWishlist(this)" >See More</a>\
                                        </div>\
                                    </div>\
                                </div>'

            wishlist.insertAdjacentHTML('beforeend', wishlistHtml);
        }
    }
}

function displayWishlistUserAll(){
    //TODO
    var wishlist = document.getElementById('allWishlistGamesRow');

    var wishlistTotal = wishlist_array.length;
    
    wishlist.innerHTML = "";
    for (var count = 0; count < wishlistTotal; count++){
        if(wishlist_array[count].game_id !== undefined || wishlist_array[count].game_id !== null){
            var wishlistHtml = '<div class="card">\
                                    <img class="card-img-top thumbnail img-thumbnail img-fluid" src=' + wishlist_array[count].thumbnail + ' />\
                                    <div class="card-body">\
                                        <div class="card-title">' + wishlist_array[count].title + ' </div>\
                                        <a href="gameinfo.html" class="btn btn-dark" data-target="gameInfo" item="' + count + '" onclick="getGameIdWishlist(this)" >See More</a>\
                                    </div>\
                                </div>'
                                

            wishlist.insertAdjacentHTML('beforeend', wishlistHtml);
        }
    }
}

function displayOwnedGamesUser(){
    var ownedGames = document.getElementById('ownedGamesTable');
    ownedGames.innerHTML = "";
    for (var count = 0; count < 4; count++){
        if(ownedgames_array[count].game_id !== undefined || ownedgames_array[count].game_id !== null){

            var ownedgamesHtml ='<div class="row">\
                                    <div class="col-md-10 col-margin" style="margin-left:35px;">\
                                        <div class="card">\
                                            <img class="card-img-top thumbnail img-thumbnail img-fluid" src=' + ownedgames_array[count].thumbnail + ' />\
                                            <div class="card-body">\
                                                <div class="card-title">' + ownedgames_array[count].title + ' </div>\
                                                <a href="gameinfo.html" class="btn btn-dark" data-target="gameInfo" item="' + count + '" onclick="getGameIdOwned(this)" >See More</a>\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>'

            ownedGames.insertAdjacentHTML('beforeend', ownedgamesHtml);
        }
    }
}

function displayOwnedGamesUserAll(){
    var ownedGames = document.getElementById('allOwnedGamesRow');
    ownedGames.innerHTML = "";
    var allownedgames = ownedgames_array.length;
    for (var count = 0; count < allownedgames; count++){
        if(ownedgames_array[count].game_id !== undefined || ownedgames_array[count].game_id !== null){

            var ownedgamesHtml ='<div class="col-md-3 col-margin" style="margin-left:35px;">\
                                    <div class="card">\
                                        <img class="card-img-top thumbnail img-thumbnail img-fluid" src=' + ownedgames_array[count].thumbnail + ' />\
                                        <div class="card-body">\
                                            <div class="card-title">' + ownedgames_array[count].title + ' </div>\
                                            <a href="gameinfo.html" class="btn btn-dark" data-target="gameInfo" item="' + count + '" onclick="getGameIdOwned(this)" >See More</a>\
                                        </div>\
                                    </div>\
                                </div>'
                                

            ownedGames.insertAdjacentHTML('beforeend', ownedgamesHtml);
        }
    }
}

function showGameInfo(){
    document.getElementById("gameTitle").textContent = game_info_array[0].title;
    document.getElementById("gameDesc").textContent = game_info_array[0].description;
    document.getElementById("gameRating").textContent = game_info_array[0].rating;
    document.getElementById("gameRelease").textContent = game_info_array[0].releaseDate;
    document.getElementById("gameDevTeam").textContent = game_info_array[0].developtmentTeam;
    document.getElementById("gameMainDev").textContent = game_info_array[0].devMain;
    document.getElementById("gameTrailer").src = game_info_array[0].video;
    document.getElementById("gamePoster").src = game_info_array[0].thumbnail;
}

//To Get Game IDs----------------------------------------------------
function getGameId(element){
    var item = element.getAttribute("item");
    var gameId = games_array[item].game_id;
    sessionStorage.setItem('gameId', gameId);
}

function getGameIdPlatform(element){

    var item = element.getAttribute("item");
    var gameId = platformgame_array[item].game_id;
    sessionStorage.setItem('gameId', gameId);

}

function getGameIdWishlist(element){
    var item = element.getAttribute("item");
    var gameId = wishlist_array[item].game_id;
    sessionStorage.setItem('gameId', gameId);
}

function getGameIdOwned(element){
    var item = element.getAttribute("item");
    var gameId = ownedgames_array[item].game_id;
    sessionStorage.setItem('gameId', gameId);
}

function getGameIdNew(element){
    var item = element.getAttribute("item");
    var gameId = newgameTable_array[item].game_id;
    sessionStorage.setItem('gameId', gameId);
}

function getGameIdHot(element){
    var item = element.getAttribute("item");
    var gameId = hotgameTable_array[item].game_id;
    sessionStorage.setItem('gameId', gameId);
}

function getGameIdPop(element){
    var item = element.getAttribute("item");
    var gameId = popgameTable_array[item].game_id;
    sessionStorage.setItem('gameId', gameId);
}

function getGameIdNewPlat(element){
    var item = element.getAttribute("item");
    var gameId = newgameplat_array[item].game_id;
    sessionStorage.setItem('gameId', gameId);
}

function getGameIdHotPlat(element){
    var item = element.getAttribute("item");
    var gameId = hotgameplat_array[item].game_id;
    sessionStorage.setItem('gameId', gameId);
}

function getGameIdPopPlat(element){
    var item = element.getAttribute("item");
    var gameId = popgameplat_array[item].game_id;
    sessionStorage.setItem('gameId', gameId);
}

function getGameIdSearch(element){
    var item = element.getAttribute("item");
    var gameId = searchresults_array[item].game_id;
    sessionStorage.setItem('gameId', gameId);
}
//End of getting Game IDs----------------------------------------------

function showGamePlatform(){
    var platformRow = document.getElementById('platformRow');
    platformRow.innerHTML = "";

    totalPlatform = platform_array.length;

    for (var count=0; count < totalPlatform; count++){

        var platformHTML = '<div class="col-md-3">\
                                <p>' + platform_array[count].platformName + '</p>\
                            </div>';
        
        platformRow.insertAdjacentHTML('beforeend', platformHTML);

    }
}

function showGameGenre(){
    var genreRow = document.getElementById('genreRow');
    genreRow.innerHTML = "";

    totalGenre = genre_array.length;

    for (var count=0; count < totalGenre; count++){

        var genreHTML = '<div class="col-md-4">\
                            <button type="button" class="btn btn-dark">' + genre_array[count].genreName + '</button>\
                        </div>';
        
        genreRow.insertAdjacentHTML('beforeend', genreHTML);
    }
}

function redirectToSearchPage(){
    window.location.href = 'searchresults.html';
}

function getSearchInput(){
    var searchInput = document.getElementById('searchBox').value;
    sessionStorage.setItem('searchInput', searchInput);
    console.log(searchInput);
    window.setTimeout(redirectToSearchPage(), 1000);
}

function displaySearchResults(){
    var searchresultsrow = document.getElementById('resultstable');

    var totalGames = searchresults_array.length;

    searchresultsrow.innerHTML = "";

    for (var count = 0; count < totalGames; count++){
        var searchHtml ='<div class="card" style="width:100%; margin-top:20px;">\
                            <div class="card-header">\
                                <h4>' + searchresults_array[count].title + ' </h4>\
                            </div>\
                            <div class="card-body row">\
                                <div class="col-md-5">\
                                    <img class="thumbnail img-fluid img-thumbnail" src="' + searchresults_array[count].thumbnail + '" />\
                                </div>\
                                <div class="col-md-7 card-text">\
                                    <p id="resultDesc">' + searchresults_array[count].description + ' </p>\
                                    <p>Rating: <span id="resultRating">' + searchresults_array[count].rating + '</span> /10</p>\
                                </div>\
                            </div>\
                            <div class="card-footer">\
                                <a href="gameinfo.html" class="btn btn-outline-dark" data-target="gameInfo" item="' + count + '" onclick="getGameIdSearch(this)" >See More</a>\
                            </div>\
                        </div>';
        
        searchresultsrow.insertAdjacentHTML('beforeend', searchHtml);
    }
}








