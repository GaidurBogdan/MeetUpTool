//check for login status

var chatBubbles = document.getElementsByClassName("chat__bubble");
var chatContainer = document.getElementsByClassName("chat__container")[0];

document.addEventListener('click', function (event) {

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
            chatContainer.id = bubble.id + "_container_id";
        }
    }

	console.log(event.target);

}, false);


