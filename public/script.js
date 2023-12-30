var socket = io();
let username = "";
const btn = document.getElementById("join-chat");
const usernameInput = document.getElementById("username-input");
const form = document.getElementById("form");
const chatroomContainer = document.querySelector(".chatroom-container");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const messageContainer = document.querySelector(".messages");

btn.addEventListener("click", (event) => {
  event.preventDefault();
  username = usernameInput.value;
  if (username) {
    form.style.display = "none";
    chatroomContainer.style.display = "block";
  }
});

sendButton.addEventListener("click", (e) => {
  e.preventDefault();
  let data = {
    id: socket.id,
    username: username,
    message: messageInput.value,
  };
  socket.emit("secret message", data);
  renderMessage(data, "SENT");
});

function renderMessage(data, messageType) {
  const msgDiv = document.createElement("div");
  msgDiv.innerText = `${data.username}: ${data.message}`;
  if (messageType === "SENT") {
    msgDiv.setAttribute("class", "message sent");
  } else if (messageType === "RECIEVED") {
    msgDiv.setAttribute("class", "message");
  }
  messageContainer.append(msgDiv);
  messageInput.value = "";
}

socket.on("io secret message", (data) => {
  // this data has a socket id
  if (data.id !== socket.id) {
    renderMessage(data, "RECIEVED");
  }
});
