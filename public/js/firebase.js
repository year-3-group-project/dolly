function checkIfLoggedIn() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log('The user is signed in');

            var user = firebase.auth().currentUser;

            if (user != null) {
                console.log("Sign-in provider: " + user.providerId);
                console.log("  Provider-specific UID: " + user.uid);
                console.log("  Name: " + user.displayName);
                console.log("  Email: " + user.email);
                console.log("  Photo URL: " + user.photoURL);
            }

            document.getElementById('google-email').innerHTML = user.email;
            document.getElementById('log').setAttribute('style', 'display: none; visibility: hidden');
            document.getElementById('reg').setAttribute('style', 'display: none; visibility: hidden');
            document.getElementById('id01').setAttribute('style', 'display: none; visibility: hidden');
            document.getElementById('out').setAttribute('style', 'visibility: visible');

        } else {
            console.log('The user is not signed in');
            document.getElementById('log').setAttribute('style', 'width: auto; visibility: visible');
            document.getElementById('out').setAttribute('style', 'display: none; visibility: hidden');
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
    checkIfLoggedIn();
}


function login() {
    var userEmail = document.getElementById("email-l").value;
    var userPass = document.getElementById("password-l").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error : " + errorMessage);

        // ...
    });

}

function register() {
    var name = document.getElementById("name-r").value;
    var email = document.getElementById("email-r").value;
    var password = document.getElementById("password-r").value;

    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
        var user = firebase.auth().currentUser;
        console.log('user created!');
        document.getElementById('id02').setAttribute('style', 'display: none; visibility: hidden');

        user.sendEmailVerification();
    }, function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('user NOT created!');
    });
}

