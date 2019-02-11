const signupForm = document.getElementsByClassName("form__container")[0];

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    var email = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.log("User created.");
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(error.message);
    });

    auth.onAuthStateChanged((user) => {
        db.collection('users').doc(user.uid).set({
            email: email,
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value
        }).then(returnedValue => {
            window.location.replace("../welcome_infos.html"); 
            });
      });
} );
