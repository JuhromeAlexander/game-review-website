//XMLHTTP Request Functions
function getReviewGame(){
    var gamereviewrequest = new XMLHttpRequest();

    var gameId = sessionStorage.getItem('gameId');

    var gamereview_url = '/reviewGame/' + gameId;

    gamereviewrequest.open('GET', gamereview_url, true);

    gamereviewrequest.onload = function(){

        reviews_array = JSON.parse(gamereviewrequest.responseText);

        getGameReviews();

    }
    gamereviewrequest.send();
}

function getReviewUser(){

    var checkLogin = authentication();

    if (checkLogin == true){
        var userreviewrequest = new XMLHttpRequest();

        var userIdReview = sessionStorage.getItem('userId');
    
        var userreview_url = '/reviewUser/' + userIdReview;
    
        userreviewrequest.open('GET', userreview_url, true);
    
        userreviewrequest.onload = function(){
    
            userreview_array = JSON.parse(userreviewrequest.responseText);
    
            getAllUserReviews();
    
        }
    
        userreviewrequest.send();
    }else{
        alert('Must be Logged In/Registered to access this page. Redirecting');
        redirectToLogin();
    }
}

function editReview(){
    
    var editreviewRequest = new XMLHttpRequest();

    var reviews = new Object();

    reviews.review = document.getElementById('editReview').value;
    reviews.rating = document.getElementById('editRating').value;
    reviews.datePosted = "";
    console.log(reviews.review);
    console.log(reviews.rating);

    var gameId = sessionStorage.getItem('gameId');
    var userId = sessionStorage.getItem('userId');

    var editreview_url = '/editReview/' + gameId + '/' + userId;

    editreviewRequest.open('PUT', editreview_url, true);

    editreviewRequest.setRequestHeader("Content-Type", "application/json");

    editreviewRequest.onload = function(){
        if (this.status === 200){
            alert("Review Successfully Updated!")
            document.location.reload();
        }
    };

    editreviewRequest.send(JSON.stringify(reviews));

}

function editUserReview(){
    
    var editreviewRequest = new XMLHttpRequest();

    var reviews = new Object();

    reviews.review = document.getElementById('editReview').value;
    reviews.rating = document.getElementById('editRating').value;
    reviews.datePosted = "";
    console.log(reviews.review);
    console.log(reviews.rating);

    var gameId = document.getElementById('gameIdUserReview').value;
    var userId = document.getElementById('userIdUserReview').value;

    console.log(gameId,userId);

    var editreview_url = '/editReview/' + gameId + '/' + userId;

    editreviewRequest.open('PUT', editreview_url, true);

    editreviewRequest.setRequestHeader("Content-Type", "application/json");

    editreviewRequest.onload = function(){
        if (this.status === 200){
            alert("Review Successfully Updated!")
            document.location.reload();
        }
    };

    editreviewRequest.send(JSON.stringify(reviews));

}

function deleteReview(){

    var deletereviewrequest = new XMLHttpRequest();

    var gameId = sessionStorage.getItem('gameId');
    var userId = sessionStorage.getItem('userId');

    var deletereview_url = '/deleteReview/' + gameId + '/' + userId;

    deletereviewrequest.open('DELETE', deletereview_url, true);

    deletereviewrequest.onload = function(){
        if (this.status === 200){
            alert("Review Successfully Deleted!");
            document.location.reload();
        }
    }

    deletereviewrequest.send();

}

function addReview(){

    var checkLogin = authentication();

    if(checkLogin == true){
        var addreviewrequest = new XMLHttpRequest();

        var addreview_url = '/addReview';

        var gameId = sessionStorage.getItem('gameId');
        var userId = sessionStorage.getItem('userId');

        var addreviewobj = new Object();

        addreviewobj.game_idReview = gameId;
        addreviewobj.user_idReview = userId;
        addreviewobj.review = document.getElementById('addReview').value;
        addreviewobj.datePosted = "";
        addreviewobj.rating = document.getElementById('addRating').value;
        

        addreviewrequest.open('POST', addreview_url, true);

        addreviewrequest.setRequestHeader("Content-Type", "application/json");

        addreviewrequest.onload = function(){
            if (this.status === 200){
                alert("Review Successfully Added!");
                document.location.reload();
            }
        }

        addreviewrequest.send(JSON.stringify(addreviewobj));
    }else{
        //If not logged in
        alert("Must be logged in to add a review. Redirecting...");
        redirectToLogin();
    }
}


//Dirty Work Functions
function getGameReviews(){
    var reviewtable = document.getElementById('reviewRow');

    var totalReviews = reviews_array.length;

    reviewtable.innerHTML = "";

    for(var count = 0; count < totalReviews; count++){

        var reviewGameHtml='<div class="card" style="width:100%; margin-top:20px;">\
                                <div class="card-header">\
                                    <div class="row justify-content-between">\
                                        <div class="col-md-6">\
                                            <h5 id="reviewUsername">'+ reviews_array[count].username  + '</h5>\
                                        </div>\
                                        <div class="col-md-6 ">\
                                            <h5 id="reviewDate">' + reviews_array[count].datePosted +'</h5>\
                                        </div>\
                                    </div>\
                                </div>\
                                <div class="card-body">\
                                    <div class="card-text">\
                                        <p id="reviewActual">' + reviews_array[count].review + '</p>\
                                        <p>Rating: <span id="reviewRating">' + reviews_array[count].rating + '</span> /10</p>\
                                    </div>\
                                </div>\
                                <div class="card-footer">\
                                    <button type="button" class="btn btn-outline-dark" item="' + count +'" data-toggle="modal" data-target="#editReviewModal" onclick="setEditReviewDetails(this)">Edit Review</button>\
                                    <button type="button" class="btn btn-outline-dark" onclick="deleteReview()">Delete Review</button>\
                                </div>\
                            </div>';

        reviewtable.insertAdjacentHTML('beforeend',reviewGameHtml);

    }

}

function getAllUserReviews(){

    var reviewUserTable = document.getElementById('allreviewsuser');
    reviewUserTable.innerHTML = "";
    var totalUserReviews = userreview_array.length;

    for(var count = 0; count < totalUserReviews; count++){
        var reviewGameHtml='<div class="card" style="width:100%; margin-top:20px;">\
                                <div class="card-header">\
                                    <div class="row justify-content-between">\
                                        <div class="col-md-6">\
                                            <h5 id="reviewTitle">'+ userreview_array[count].title  + '</h5>\
                                        </div>\
                                        <div class="col-md-6 ">\
                                            <h5 id="reviewDate">' + userreview_array[count].datePosted +'</h5>\
                                        </div>\
                                    </div>\
                                </div>\
                                <div class="card-body">\
                                    <div class="card-text">\
                                        <p id="reviewActual">' + userreview_array[count].review + '</p>\
                                        <p>Rating: <span id="reviewRating">' + userreview_array[count].rating + '</span> /10</p>\
                                    </div>\
                                </div>\
                                <div class="card-footer">\
                                    <button type="button" class="btn btn-outline-dark" item="' + count +'" data-toggle="modal" data-target="#editUserReviewModal" onclick="setEditUserReviewDetails(this)">Edit Review</button>\
                                </div>\
                            </div>';

        reviewUserTable.insertAdjacentHTML('beforeend', reviewGameHtml);
    }
}

function setEditReviewDetails(element){

    var checkLogin = authentication();
    //If user is logged In
    if(checkLogin == true){

        var userId = sessionStorage.getItem('userId');
        var item = element.getAttribute("item");
        console.log(item)
        console.log(userId)
        console.log(reviews_array[item].user_idReview)

        if (reviews_array[item].user_idReview != userId){
            alert("Unable to Edit Review of another User!");
            document.location.reload();
        }else{
            document.getElementById('editReview').value = reviews_array[item].review;
            document.getElementById('editRating').value = reviews_array[item].rating;
        }
    }else{
        //If user is not logged in
        alert("You are not logged In, Log In/Register to edit reviews.\ Redirecting...")
        redirectToLogin();
    }
    
}

function setEditUserReviewDetails(element){

    var checkLogin = authentication();
    //If user is logged In
    if(checkLogin == true){

        var userId = sessionStorage.getItem('userId');
        var item = element.getAttribute("item");
        console.log(item)
        console.log(userId)
        console.log(userreview_array[item].user_idReview)

        if (userreview_array[item].user_idReview != userId){
            alert("Unable to Edit Review of another User!");
            document.location.reload();
        }else{
            document.getElementById('editReview').value = userreview_array[item].review;
            document.getElementById('editRating').value = userreview_array[item].rating;
            document.getElementById('gameIdUserReview').value = userreview_array[item].game_idReview;
            document.getElementById('userIdUserReview').value = userreview_array[item].user_idReview;

        }
    }else{
        //If user is not logged in
        alert("You are not logged In, Log In/Register to edit reviews.\ Redirecting...")
        redirectToLogin();
    }
    
}