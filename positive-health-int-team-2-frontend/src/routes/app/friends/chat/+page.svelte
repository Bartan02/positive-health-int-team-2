<script>

	import { none } from "ol/centerconstraint";
	import { get } from "ol/proj";



const MeSelectorBtn = document.querySelector('#Me-selector')
const OtherUserSelectorBtn = document.querySelector('#OtherUser-selector')
const chatHeader = document.querySelector('.chat-header')
const chatMessages = document.querySelector('.chat-messages')
const chatInputForm = document.querySelector('.chat-input-form')
const chatInput = document.querySelector('.chat-input')
const clearChatBtn = document.querySelector('.clear-chat-button')

const messages = JSON.parse(localStorage.getItem('messages')) || []

const username = JSON.parse(localStorage.getItem('userinfo')).username
MeSelectorBtn.innerText = username


const createChatMessageElement = (message) => `
  <div class="message ${message.sender === 'Me' ? 'blue-bg' : 'gray-bg'}">
    <div class="message-sender">${message.sender}</div>
    <div class="message-text">${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
  </div>
`

window.onload = () => {
  messages.forEach((message) => {
    chatMessages.innerHTML += createChatMessageElement(message)
  })
}

let messageSender = 'Me'

const updateMessageSender = (name) => {
  messageSender = name
  chatInput.placeholder = `Type here`

  if (name === 'Me') {
    MeSelectorBtn.classList.add('active-person')
    OtherUserSelectorBtn.classList.remove('active-person')
  }
  if (name === 'OtherUser') {
    OtherUserSelectorBtn.classList.add('active-person')
    MeSelectorBtn.classList.remove('active-person')
  }

  /* auto-focus the input field */
  chatInput.focus()
}

MeSelectorBtn.onclick = () => updateMessageSender('Me')
OtherUserSelectorBtn.onclick = () => updateMessageSender('OtherUser')

const sendMessage = (e) => {
  e.preventDefault()

  const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  const message = {
    sender: messageSender,
    text: chatInput.value,
    timestamp,
  }

  /* Save message to local storage */
  messages.push(message)
  localStorage.setItem('messages', JSON.stringify(messages))

  /* Add message to DOM */
  chatMessages.innerHTML += createChatMessageElement(message)

  /* Clear input field */
  chatInputForm.reset()

  /*  Scroll to bottom of chat messages */
  chatMessages.scrollTop = chatMessages.scrollHeight
}

chatInputForm.addEventListener('submit', sendMessage)

clearChatBtn.addEventListener('click', () => {
  localStorage.clear()
  chatMessages.innerHTML = ''
})

</script>

<svelte:head>
  <title> ChatApp </title>
</svelte:head>

    <!-- Person selector: this contains buttons for user to select whether to chat as Me or OtherUser -->
    <div class="person-selector">
      <button class="button person-selector-button active-person" id="Me-selector"></button>
      <button class="button person-selector-button" id="OtherUser-selector">OtherUser</button>
    </div>
    <div class="chat-container">
      <h2 class="chat-header"></h2>

    
      <div class="chat-messages">
        <div class="message blue-bg">
          <div class="message-sender"></div>
          <div class="message-text"></div>
          <div class="message-timestamp"></div>
        </div>
        <div class="message gray-bg">
          <div class="message-sender"></div>
          <div class="message-text"></div>
          <div class="message-timestamp"></div>
        </div>
      </div>

      <form class="chat-input-form">
        <input type="text" class="chat-input" required placeholder="Type here" />
        <button type="submit" class="button send-button">Send</button>
      </form>
      <button class="button clear-chat-button">Clear Chat</button>
    </div>

    <style>
      body {
  background-image: linear-gradient(
    23deg,
    hsl(49deg 100% 69%) 0%,
    hsl(16deg 80% 61%) 2%,
    hsl(330deg 81% 34%) 12%,
    hsl(259deg 100% 15%) 50%,
    hsl(212deg 100% 25%) 88%,
    hsl(197deg 100% 30%) 98%,
    hsl(183deg 79% 36%) 100%
  );
  height: 100vh;
}


.button {
  border: none;
  padding: 0.625em;
  border-radius: 0.5em;
  cursor: pointer;
}

.button:hover {
  filter: brightness(0.9);
}

.button:active {
  transform: translateY(2px);
}

.person-selector {
  display: flex;
  justify-content: center;
  gap: 1em;
  margin: 3em auto 1em;
  max-width: 40em;
}

.person-selector-button {
  width: 100%;
  background-color: #15202b;
  color: #fff;
  font-size: 1.1em;
}

.active-person {
  background: #08529d;
  box-shadow: 0 0 0.5em 0.1em #c3c3c333;
}

.chat-container {
  background: #15202b;
  font-family: 'Roboto', sans-serif;
  border-radius: 0.5em;
  padding: 0.5em 1.25em;
  margin: auto;
  max-width: 37.5em;
  height: 37.5em;
  box-shadow: 0 0 1.25em 0.5em #c3c3c333;
}

.chat-header {
  margin-bottom: 1em;
  color: #fff;
}

.chat-header h2 {
  font-size: 1.25em;
  font-weight: bold;
}

.chat-messages {
  height: 23em;
  overflow-y: scroll;
}

.chat-messages::-webkit-scrollbar {
  display: none;
}

.message {
  padding: 0.625em;
  border-radius: 1em;
  margin-bottom: 0.625em;
  display: flex;
  flex-direction: column;
  color: #fff;
}

.message-sender {
  font-weight: bold;
  margin-bottom: 0.31em;
}

.message-text {
  font-size: 1em;
  margin-bottom: 0.31em;
  word-wrap: break-word;
}

.message-timestamp {
  font-size: 0.75em;
  text-align: right;
}

.blue-bg {
  background-color: #1c9bef;
}

.gray-bg {
  background-color: #3d5365;
}

.chat-input-form {
  display: flex;
  align-items: center;
  margin-top: 2em;
  gap: 0.625em;
}

.chat-input {
  padding: 0.625em;
  border: none;
  border-radius: 0.5em;
  background-color: #f5f5f5;
  color: #333;
  font-size: 1em;
  flex-grow: 1;
}

.send-button {
  background-color: #1c9bef;
  color: #fff;
  font-size: 1em;
  font-weight: bold;
}

.clear-chat-button {
  display: block;
  margin: 2.5em auto;
}

.chat-messages .message:nth-child(1),
.chat-messages .message:nth-child(2) {
  display: none;
}

    </style>



