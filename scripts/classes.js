class Conversation {
    constructor(name, imageURL, userID) {
        this.name = name;
        this.imageURL = imageURL;
        this.userID = userID;
    }

    renderChatBubble () {
        let chatBubble = document.createElement("li");
        chatBubble.className = "chat__bubble";
        chatBubble.style.backgroundImage = this.imageURL;
        chatBubble.id = this.userID;
        document.getElementsByClassName("chat__bubbles__list")[0].appendChild(chatBubble);
    }

    replaceChatHistory (messagesList) {
        let conversationHistory = document.getElementsByClassName("conversation__history__section")[0];
        conversationHistory.innerHTML = "";
        let nametitle = document.getElementsByClassName("op__name")[0];
        nametitle.innerHTML = this.name;

        messagesList.forEach(element => {
            if (element.sender == auth.currentUser.uid) {
                let myMessage = document.createElement("p");
                myMessage.className = "user__message";
                myMessage.innerHTML = element.actualMessage;
                conversationHistory.appendChild(myMessage);
            }
            else {    
                let opMessage = document.createElement("p");
                opMessage.className = "op__message";
                opMessage.innerHTML = element.actualMessage;
                conversationHistory.appendChild(opMessage);
            }
        });
    }
}

class User {
    constructor(doc) {
        this.doc = doc;
        this.data = doc.data();
    }

    renderUser(parentLocation) {
        let userContainer = `
        <div class="user__container" id="${this.doc.id}">
            <div class="user__avatar boy"></div>
            <div class="user__name">
               ${ this.data.firstName + " " + this.data.lastName}
            </div>
            <div class="user__last__active">
                Active 5min ago    
            </div>
            <div class = "user__buttons__container">
                <a class="user__message__button link">Message!</a>
                <a class="user__friend__button link">Add Friend</a>
            </div>
        </div>`;
        parentLocation.innerHTML += userContainer;
    }

}
