<script>
	import { onMount } from "svelte";
	import ActivityManager from "../../../../components/ActivityManager.svelte";
  let chatHeader, chatMessages, chatInputForm, chatInput, messages, username;


//////MESSAGE.SENDER SHOULD COMPARE YOUR USER ID
const createChatMessageElement = (message) => `
  <div class="message ${message.sender === 'Me' ? 'blue-bg' : 'gray-bg'}">
    <div class="message-sender">${message.sender}</div>
    <div class="message-text">${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
  </div>
`;

onMount(() => {
  // let messageSender = 'Me';

  //////FETCH MESSAGES FROM CHAT DATABASE BY FETCH
  messages = JSON.parse(localStorage.getItem('messages')) || [];

  //////USERINFO WILL BE ALREADY TRANSFERRED FROM FRIENDS PAGE AFTER CLICKING ONE OF THE FRIENDS
  username = JSON.parse(localStorage.getItem('userinfo')).username;
  
  //////DISPLAY THE USERNAME YOU ARE CURRENTLY CHATTING
  // MeSelector.innerText = username;

  //////DISPLAY MESSAGES ON CHAT
  messages.forEach((message) => {
    chatMessages.innerHTML += createChatMessageElement(message)
  });

  chatInputForm.addEventListener('submit', sendMessage);

  // clearChatBtn.addEventListener('click', () => {
  //   localStorage.clear()
  //   chatMessages.innerHTML = ''
  // });

  // MeSelectorBtn.addEventListener ('click', () => updateMessageSender('Me'))
  // OtherUserSelectorBtn.addEventListener ('click', () => updateMessageSender('OtherUser'));

  /////////REFRESH THE MESSAGES IN 0.5-1 SEC
});



// const updateMessageSender = (name) => {
//   messageSender = name
//   chatInput.placeholder = `Type here`

//   if (name === 'Me') {
//     MeSelectorBtn.classList.add('active-person')
//     OtherUserSelectorBtn.classList.remove('active-person')
//   }
//   if (name === 'OtherUser') {
//     OtherUserSelectorBtn.classList.add('active-person')
//     MeSelectorBtn.classList.remove('active-person')
//   }

//   /* auto-focus the input field */
//   chatInput.focus()
// }

const sendMessage = (e) => {
  e.preventDefault()

  const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  const message = {
    sender: 'Me',
    text: chatInput.value,
    timestamp,
  }

  ///////PUSH THE MESSAGE TO THE CHAT DATABASE

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
</script>

<svelte:head>
  <title> Chat with ... </title>
</svelte:head>

    <!-- Person selector: this contains buttons for user to select whether to chat as Me or OtherUser -->
    <!-- <div class="person-selector">
      <button class="button person-selector-button active-person" bind:this={MeSelectorBtn}></button>
      <button class="button person-selector-button" bind:this={OtherUserSelectorBtn}>OtherUser</button>
    </div> -->
    <div class="chat-container">
      <h2 class="chat-header" bind:this={chatHeader}> BACK Friend username</h2>
    
      <div class="chat-messages"  bind:this={chatMessages}>
        <!-- <div class="message blue-bg">
          <div class="message-sender"></div>
          <div class="message-text"></div>
          <div class="message-timestamp"></div>
        </div>
        <div class="message gray-bg">
          <div class="message-sender"></div>
          <div class="message-text"></div>
          <div class="message-timestamp"></div>
        </div> -->
      </div>

      <form class="chat-input-form" bind:this={chatInputForm}>
        <input type="text" class="chat-input" bind:this={chatInput} required placeholder="Type here" />
        <button type="submit" class="button send-button">Send</button>
      </form>
      <!-- <button class="button clear-chat-button" bind:this={clearChatBtn}>Clear Chat</button> -->
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
  height: auto;
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
  background: #ffffff;
  font-family: 'Roboto', sans-serif;
  padding: 0.5em 1.25em;
  margin: auto;
  max-width: 37.5em;
  height: 100vh;
}

.chat-header {
  margin-bottom: 1em;
  color: #f39c39;
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
  background-color: rgb(245, 146, 65);
}

.gray-bg {
  background-color: #de9f4c;
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
  background-color: #e59b33;
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



