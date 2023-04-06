import { fetchBotResponse } from "/js/fetchBotResponse.js";

var chatBot = document.getElementById("chatBot");
var expandButton = document.getElementById("expandButton");
expandButton.onclick = expandChat;

// create chat log container element
var chatLog = document.createElement("div");
chatLog.id = "chatlog";
chatBot.appendChild(chatLog);

// create bot reply message element
const botResponse =
  "Hello, I am the Compis.se official chat bot. How can I assist you today?";
const botMessage = document.createElement("p");
botMessage.classList.add("message", "bot");
botMessage.innerHTML = botResponse;

// add bot reply to chat log
chatLog.appendChild(botMessage);

function scrollToBottom() {
  var log = document.getElementById("chatlog");
  log.scrollTop = log.scrollHeight;
  console.log(log.scrollHeight);
}

// create input field element
var inputField = document.createElement("input");
inputField.type = "text";
inputField.id = "input";
inputField.placeholder = "Type your message here";
inputField.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    sendMessage();
  }
});
inputField.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent default behavior
  event.stopPropagation(); // Prevent event bubbling
  scrollToBottom();
});
chatBot.appendChild(inputField);

// create send button element
var sendButton = document.createElement("button");
sendButton.classList.add("sendButton");
sendButton.innerHTML = "Send";
sendButton.onclick = sendMessage;
chatBot.appendChild(sendButton);

function expandChat() {
  chatBot.classList.add("expanded");
  minimizeButton.classList.add("expanded");
  chatLog.classList.add("expanded");
  inputField.classList.add("expanded");
  sendButton.classList.add("expanded");
  expandButton.classList.remove("expanded");
  /*  inputField.focus(); */
}

// create minimize button element
var minimizeButton = document.createElement("button");
minimizeButton.classList = "minimizeButton minimizeChatBot";
minimizeButton.innerHTML = '<ion-icon name="remove-circle-outline"></ion-icon>';
minimizeButton.onclick = minimizeChat;
chatBot.appendChild(minimizeButton);

function minimizeChat() {
  chatBot.classList.remove("expanded");
  minimizeButton.classList.remove("expanded");
  chatLog.classList.remove("expanded");
  inputField.classList.remove("expanded");
  sendButton.classList.remove("expanded");
  expandButton.classList.add("expanded");
}

async function sendMessage() {
  // get user input
  var userInput = inputField.value;

  // create user input message element
  var userMessage = document.createElement("p");
  userMessage.classList.add("message", "user");
  userMessage.innerHTML = userInput;
  chatLog.appendChild(userMessage);
  inputField.value = "";

  // create waiting for response animation element
  var loadingAnimation = document.createElement("div");
  loadingAnimation.classList.add("loading-dots");
  for (let i = 0; i < 3; i++) {
    const dot = document.createElement("div");
    loadingAnimation.appendChild(dot);
  }
  chatLog.appendChild(loadingAnimation);

  // send user input to server and receive response
  try {
    const botResponse = await fetchBotResponse(userInput);
    chatLog.removeChild(loadingAnimation); // remove loading animation
    var botMessage = document.createElement("p");
    botMessage.classList.add("message", "bot");
    botMessage.innerHTML = botResponse;
    chatLog.appendChild(botMessage);
    scrollToBottom();
  } catch (error) {
    chatLog.removeChild(loadingAnimation); // remove loading animation in case of error
    console.error(error);
  }
}

/* function sendMessage() {
  // get user input
  var userInput = inputField.value;

  // create user input message element
  var userMessage = document.createElement("p");
  userMessage.classList.add("message", "user");
  userMessage.innerHTML = userInput;

  // add user input message to chat log
  chatLog.appendChild(userMessage);

  // clear input field
  inputField.value = "";

  // send user input to server and receive response
  getBotResponse(userInput);
} */
