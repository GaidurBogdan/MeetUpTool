var submitButton = document.getElementsByClassName("submit__button")[0];
var inputField = document.getElementsByClassName("search__field")[0];

function handleSubmit() {
    if (inputField.value == "") {
        alert("You forgot to enter a name!");
    }
    else {
        //cleanup previous results first
        document.getElementById("numberOfUsers").innerHTML = "";
        document.getElementsByClassName("users__container")[0].innerHTML = "";

        var searchQuery = inputField.value.toLowerCase();
        db.collection("users").get().then(snapshot => {
            var nrOfUsers = 0;
            snapshot.docs.forEach(doc => {
                var combinedName = doc.data().firstName + " " + doc.data().lastName;
                combinedName = combinedName.toLowerCase();
                if (combinedName.includes(searchQuery)) {
                    let newUser = new User(doc);
                    newUser.renderUser(document.getElementsByClassName("users__container")[0]);
                    nrOfUsers++;
                }
            })
            document.getElementById("numberOfUsers").innerHTML ="Number of search results: " + nrOfUsers;
        });
    }
};

submitButton.addEventListener("click", handleSubmit, false);
inputField.addEventListener("keyup", function() {
    event.preventDefault();
    //Enter button has the keycode 13
    if (event.keyCode === 13) {
        // Trigger the search query
        handleSubmit();
    }
});