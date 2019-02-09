const loginForm = document.getElementsByClassName("form__container")[0];

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    var email = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        window.location.replace("../index.html"); 
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(error.message);
    });
} );
