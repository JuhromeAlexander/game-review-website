//XMLHttpRequest Functions
function addUserRequest(){
    var addUserRequest = new XMLHttpRequest();
    var add_user_url = '/addUser'

    addUserRequest.open('POST',add_user_url,true);

    addUserRequest.setRequestHeader("Content-Type", "application/json");

    var userData = new Object();

    userData.name = document.getElementById('regName').value;
    userData.email = document.getElementById('regEmail').value;
    userData.username = document.getElementById('regUsername').value;
    userData.password = document.getElementById('regPassword').value;
    regConfPassword = document.getElementById('regConfPassword').value;

    console.log(regName, regEmail, regUsername, regPassword, regConfPassword);

    addUserRequest.onload = function(){
        //If add user is successful
        if (this.status === 200){
            getUserId(userData.username);

            console.log("Successful Register")
            //Delay needed to allow the getUserId() function to run
            window.setTimeout(redirectToAccountPage, 500);
              
        }else{
            //If add user is not successful
            console.log("Register Failed")
            console.warn(addUserRequest.responseText)
        }
    }

    //Check whether fields are correct
    if(userData.password == regConfPassword){
        console.log("Same Password")
        addUserRequest.send(JSON.stringify(userData));
    }else{
        alert("Passwords Do not Match");
    }
    

}

function authenticate(){
    var loginRequest = new XMLHttpRequest();
    login_url = '/login';
    loginRequest.open('POST',login_url,true);
    
    username = document.getElementById('loginUsername').value;
    password = document.getElementById('loginPassword').value;
    

    loginRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // loginRequest.onreadystatechange = function(){
    //     if (this.readyState === XMLHttpRequest.DONE && this.status === 200){
    //         //Request Finished. Allocate userId to session storage
    //         response = JSON.parse(loginRequest.responseText);
    //         if (response.message == "1"){
    //             console.log('Successfully Logged In')
    //             var userId = getUserId(username);
    //             console.log(userId);
    //             //window.location.href = 'index.html';
    //         }else{
    //             console.log('Invalid Credentials Boi')
    //     }

    //     }
    // }

    loginRequest.onload = function(){
        //Request Finished. Allocate userId to session storage
        response = JSON.parse(loginRequest.responseText);
        if (response.message == "1"){
            console.log('Successfully Logged In')
            //window.location.href = 'index.html';
            alert('Successfully Logged In')
            window.setTimeout(getUserId(username),100)
            // getUserId(username);
        }else{
            console.log('Invalid Credentials Boi')
        }
    }

    loginRequest.send('username=' + username +'&password=' + password);
    
}

function getUserId(username){
    var userRequest = new XMLHttpRequest();

    var user_url = '/users';

    userRequest.open('GET', user_url, true);

    userRequest.onload = function(){
    
        var user_array = JSON.parse(userRequest.response);
        console.log(user_array);
        console.log(username);
        
        for(var count = 0; count < user_array.length; count++){
            console.log("Inside For Loop, Outside if statement")
            if(user_array[count].username == username){
                var user_id_local = user_array[count].user_id;
                
                sessionStorage.setItem('userId', user_id_local);
                console.log('Test 1')
                console.log(sessionStorage.getItem('userId'));
            }
        }
        
    }
    
    userRequest.send();
    
}

function getUserDetails(){

    var checkLogin = authentication();

    if (checkLogin == true){
        var user_requestDetails = new XMLHttpRequest();
    
        userIdDetails = sessionStorage.getItem('userId');
        console.log(userIdDetails)

        var user_url = '/users/' + userIdDetails;
        console.log(user_url)

        user_requestDetails.open('GET', user_url, true);

        user_requestDetails.onload = function(){
            user = JSON.parse(user_requestDetails.response);
            console.log(user);
            setUserDetails();
            //Functions Wishlist & Owned Games
            getWishlist();
            getOwnedGames();
        }

        user_requestDetails.send();
    }else{
        alert('Log In/Register to access this page. Redirecting...');
        redirectToLogin();
    }

}

function editAccount(){
    var editAccountRequest = new XMLHttpRequest();

    userId = sessionStorage.getItem('userId');

    var editacct_url = '/updateUser/' + userId;

    var newUserData = new Object();

    newUserData.name = document.getElementById('editName').value;
    newUserData.description = document.getElementById('editDesc').value;
    newUserData.email = document.getElementById('editEmail').value;
    newUserData.username = document.getElementById('editUsername').value;
    newUserData.password = document.getElementById('editPass').value;
    
    console.log(newUserData);
    console.log(editacct_url);
    console.log(newUserData.password);
    
    editAccountRequest.open('PUT', editacct_url, true);
    editAccountRequest.setRequestHeader("Content-Type", "application/json");

    editAccountRequest.onload = function(){
        if(this.status === 200){
            alert("Account Successfully Updated!");
            //window.setTimeout(redirectToAccountPage,400);
            document.location.reload();
        }
    };

    editAccountRequest.send(JSON.stringify(newUserData));

}

function deleteAccount(){
    var deleteAccountRequest = new XMLHttpRequest();
    userId = sessionStorage.getItem('userId');
    var deleteAccount_url = '/deleteUser/' + userId;

    deleteAccountRequest.open('DELETE', deleteAccount_url, true);

    deleteAccountRequest.onload = function(){
        if(this.status === 200){
            alert("Account Successfully Deleted!");
            sessionStorage.removeItem('userId');
            console.log(sessionStorage.getItem('userId'));
            window.setTimeout(redirectToLogin, 500);

        }
    }

    deleteAccountRequest.send();
}

//Dirty Work Functions

function setUserDetails(){
    document.getElementById('accountImage').src = user[0].image;
    document.getElementById('accountInfoName').textContent = user[0].name;
    document.getElementById('accountInfoUsername').textContent = user[0].username;
    document.getElementById('accountInfoEmail').textContent = user[0].email;
    document.getElementById('accountInfoDesc').textContent = user[0].description;
}

function redirectToAccountPage(){
    window.location.href = "accountinfo.html";
}

function redirectToLogin(){
    window.location.href = "login.html";
}

function setEditDetails(){
    getUserDetails();
    console.log(user[0].username);
    document.getElementById('editUsername').value = user[0].username;
    document.getElementById('editName').value = user[0].name;
    document.getElementById('editEmail').value = user[0].email;
    document.getElementById('editDesc').value = user[0].description;
}

//Check whether the user is logged in or not
function authentication(){

    var userId = sessionStorage.getItem('userId');

    if (userId != null || userId != undefined){
        return true;
    }else{
        return false;
    }

}