const socket = io('http://localhost:3000');
const messageForm = document.getElementById("messagecontainer");
const messageInput = document.getElementById("m");
const messageBoard = document.getElementById("messageboard");

const usernameField = document.getElementById("usernamecontainer");
const usernameInput = document.getElementById("username");
var username = usernameInput.value;
addMessage("You joined");
socket.emit("new-user", username);

socket.on('chat-message', data => {
   console.log(data);
   addMessage(data["username"], data["message"]);
})

socket.on('user-joined', username => {
   addMessage(`${username} joined the chat`);
})

socket.on('user-left', username => {
   addMessage(`${username} left the chat`);
})

socket.on('changed-name', data => {
   addMessage(data);
})

messageForm.addEventListener('submit', e => {
   e.preventDefault();
   const message = messageInput.value;
   socket.emit('send-chat-message', message);
   messageInput.value = "";
   addMessage(username, message);
})

usernameField.addEventListener('submit', e => {
   e.preventDefault();
   username = usernameInput.value;
   socket.emit("changed-username", username);
   addMessage(`You became ${username}`);
})

function addMessage(name, text) {
   var msg = document.createElement("li");
   if (text != null) {
      name = name + ": " + text;
   }
   msg.appendChild(document.createTextNode(name));
   messageBoard.appendChild(msg);
}