/**
 * Restricted access function
 *
 * If user is logged in, it does nothing
 * if user is not logged in, then it redirects back to home page.
 */
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log('Stay in this page');
        window.location = '/';
    } else {
        console.log('Redirect!!! you cant see this page');
        // window.location = '/';
    }
});