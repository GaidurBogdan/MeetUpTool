
var locationVariable = document.getElementById("location");
var domainVariable = document.getElementById("domain");

document.getElementsByClassName("find_a_buddy_button")[0].addEventListener("click", function() {
    db.collection("users").doc(auth.currentUser.uid).get().then((doc) => {
        var userData = doc.data();
        userData.location = locationVariable.value;
        userData.domain = domainVariable.value;
        
        db.collection("users").doc(auth.currentUser.uid).update(userData).then(docRef => {
            window.location.replace("../index.html");
        });
    });
});