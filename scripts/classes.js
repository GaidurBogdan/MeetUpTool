class Conversation {
    constructor() {
        
    }

    renderChatBubble (params) {
        let chatBubble = document.createElement("li");
        chatBubble.className = "chat__bubble";
        chatBubble.style.backgroundImage = "url(\"images/student_boy_avatar.jpg\")";
        chatBubble.id = "Friend3";
        document.getElementsByClassName("chat__bubbles__list")[0].appendChild(chatBubble);
    }

    replaceChatHistory () {
        let conversationHistory = document.getElementsByClassName("conversation__history__section")[0];
        conversationHistory.innerHTML = "";

        let myMessage = document.createElement("p");
        myMessage.className = "user__message";
        myMessage.innerHTML = "Ce faci boy, iesi oleaca?";
        
        let opMessage = document.createElement("p");
        opMessage.className = "op__message";
        opMessage.innerHTML = "Nu pot, am treaba..";

        conversationHistory.appendChild(myMessage);
        conversationHistory.appendChild(opMessage);
    }
}

class User {
    constructor(firstName, lastName, phone, fbacc,twacc,ghacc,email,
        knownSubjects, favouriteLocations, fieldOfExpertise, isActive,
        calendar, invitations, friends, meetings) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.fbacc = fbacc;
        this.twacc = twacc;
        this.ghacc = ghacc;
        this.email = email;
        this.knownSubjects = knownSubjects;
        this.favouriteLocations = favouriteLocations;
        this.fieldOfExpertise = fieldOfExpertise;
        this.isActive = isActive;
        this.calendar = calendar;
        this.invitations = invitations;
        this.friends = friends;
        this.meetings = meetings;
    }

}
