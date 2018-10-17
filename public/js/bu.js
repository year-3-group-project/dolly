function checkIfLoggedIn() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.

            // document.getElementById("user_div").style.display = "block";
            // document.getElementById("login_div").style.display = "none";
            console.log('The user is signed in');
            var user = firebase.auth().currentUser;

            if (user != null) {

                console.log("Sign-in provider: " + user.providerId);
                console.log("  Provider-specific UID: " + user.uid);
                console.log("  Name: " + user.displayName);
                console.log("  Email: " + user.email);
                console.log("  Photo URL: " + user.photoURL);

            }
            console.log(user);
            // document.getElementById('google-displayName').innerHTML = user.displayName;
            // document.getElementById('google-pic').src = user.photoURL;
            document.getElementById('google-email').innerHTML = user.email;
            document.getElementById('log').setAttribute('style', 'display: none; visibility: hidden');
            document.getElementById('out').setAttribute('style', 'visibility: visible');

        } else {
            console.log('The user is not signed in');
            document.getElementById('log').setAttribute('style', 'width: auto; visibility: visible');
            document.getElementById('out').setAttribute('style', 'display: none; visibility: hidden');


            // No user is signed in.

            // document.getElementById("id01").style.display = "none";
            // document.getElementById("login_div").style.display = "block";

        }
    });
}
window.onload = function() {
    checkIfLoggedIn();
};

function logout() {
    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
    }, function(error) {
        console.error('Sign Out Error', error);
    });
    // window.location = '/';
    // window.location = '/';
    // console.log('bu')
    checkIfLoggedIn();
}


function login() {
    // console.log("hello");
    var userEmail = document.getElementById("email").value;
    var userPass = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error : " + errorMessage);

        // ...
    });

}

