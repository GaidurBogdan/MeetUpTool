class Conversation {
    constructor(height, width) {
        this.height = height;
        this.width = width;
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

let DanAndronic = new Conversation();
DanAndronic.renderChatBubble();
DanAndronic.replaceChatHistory();