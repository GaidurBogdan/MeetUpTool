let signoutButton = document.getElementById("signout");

signoutButton.addEventListener("click", function () {
    auth.signOut();
})

auth.onAuthStateChanged(user => {
    if (user == null) {
        if (window.location.pathname.split("/").pop() == "index.html") {
            window.location.replace("./pages/login.html");
        }
        else {
            window.location.replace("login.html");
        }
    }
    console.log(user.email);
});