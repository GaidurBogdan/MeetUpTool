//check for login status

var chatBubbles = document.getElementsByClassName("chat__bubble");
var chatContainer = document.getElementsByClassName("chat__container")[0];

document.addEventListener('click', function (event) {

    //clicking on a chat bubble event handler
	if (event.target.matches('.chat__bubble')) {
        let bubble = event.target;
        
        bubble.classList.remove("unread__message");

        if (chatContainer.classList.contains("hidden")) {
            chatContainer.classList.remove("hidden");
        }
        
        if (bubble.classList.contains("highlighted")) {
            chatContainer.classList.add("hidden");
            bubble.classList.remove("highlighted");
        } else {
            for (var i=0; i < chatBubbles.length; i++)
                chatBubbles[i].classList.remove("highlighted");
            bubble.classList.add("highlighted");
            chatContainer.id = bubble.id;
        }

        //change content of chat
        var userID = event.target.id;
        var myID = auth.currentUser.uid;
        var otherPersonName;
        db.collection("users").doc(userID).get().then(doc => {
            otherPersonName = doc.data().firstName + " " + doc.data().lastName;
        })
        db.collection("conversations").get().then( (snapshot) => {
            var conversation = null; 
            snapshot.docs.forEach(doc => {
                let data = doc.data();
                if ((data.ID1 == userID &&  data.ID2 == myID) || (data.ID1 == myID && data.ID2 == userID)) {
                    conversation = doc;
                }
            });

            document.getElementsByClassName("message__input")[0].value = "";

            let conversationEntity = new Conversation(otherPersonName, 'images/student_boy_avatar.png', userID);
            //conversationEntity.replaceChatHistory(conversation.data().messages);

            db.collection("conversations").doc(conversation.id).onSnapshot(doc => {
                conversationEntity.replaceChatHistory(doc.data().messages);
            });
        });

    }

    //clicking on a write message button 
    if (event.target.matches('.user__message__button')) {
        var userID = event.target.parentElement.parentElement.id;
        var myID = auth.currentUser.uid;
        var otherPersonName;
        db.collection("users").doc(userID).get().then(doc => {
            otherPersonName = doc.data().firstName + " " + doc.data().lastName;
        })

        db.collection("conversations").get().then( (snapshot) => {
            var conversation = null; 
            snapshot.docs.forEach(doc => {
                let data = doc.data();
                if ((data.ID1 == userID &&  data.ID2 == myID) || (data.ID1 == myID && data.ID2 == userID)) {
                    conversation = doc;
                }
            });
            if (conversation == null) {
                db.collection("conversations").add({
                    ID1: myID,
                    ID2: userID,
                    messages: []
                }).then(docRef => {
                    conversation = docRef.id;
                    conversation = db.collection("conversations").doc(conversation).get();
                })
            }

            chatContainer.id = userID;
            let conversationEntity = new Conversation(otherPersonName, 'images/student_boy_avatar.png', userID);
            conversationEntity.renderChatBubble();

            db.collection("conversations").doc(conversation.id).onSnapshot(doc => {
                conversationEntity.replaceChatHistory(doc.data().messages);
            });
        });
    }

}, false);

document.addEventListener('submit', function (event) {
    event.preventDefault();

    //submit a message in chat
    if (event.target.matches('.write__message__section')) {
        var userID = event.target.parentElement.id;
        var myID = auth.currentUser.uid;
        var otherPersonName;
        db.collection("users").doc(userID).get().then(doc => {
            otherPersonName = doc.data().firstName + " " + doc.data().lastName;
        })
        db.collection("conversations").get().then( (snapshot) => {
            var conversation = null; 
            snapshot.docs.forEach(doc => {
                let data = doc.data();
                if ((data.ID1 == userID &&  data.ID2 == myID) || (data.ID1 == myID && data.ID2 == userID)) {
                    conversation = doc;
                }
            });

            let myMessage = document.createElement("p");
                myMessage.className = "user__message";
                myMessage.innerHTML = event.target.value;

            let conversationID = conversation.id;
            conversation = conversation.data();
            
            conversation.messages.push({
                sender: myID,
                actualMessage: document.getElementsByClassName("message__input")[0].value
            });
            
            if (document.getElementsByClassName("message__input")[0].value == "") {
                conversation.messages.pop();
            }

            document.getElementsByClassName("message__input")[0].value = "";
            db.collection("conversations").doc(conversationID).update(conversation);

            //let conversationEntity = new Conversation(otherPersonName, 'images/student_boy_avatar.png', userID);
            //conversationEntity.replaceChatHistory(conversation.messages);
        });
    }

}, false);

//render all users
db.collection('users').get().then( (snapshot) => {
    document.getElementsByClassName("feed__section__title")[0].innerHTML += snapshot.docs.length -1;

    snapshot.docs.forEach(doc => {
        if (doc.id != auth.currentUser.uid) {
            let newUser = new User(doc);
            newUser.renderUser(document.getElementsByClassName("feed__section")[0]);
        }
    });
});


//listen to all the conversation the current user is involved in
/*
db.collection("conversations").then(snapshot => {
    snapshot.docs.forEach(doc => {
        if (doc.data().ID1 == auth.currentUser.uid || doc.data().ID2 == auth.currentUser.uid) {
            doc.onSnapshot(function(doc) {
                
            });
        }
    })
});
*/
