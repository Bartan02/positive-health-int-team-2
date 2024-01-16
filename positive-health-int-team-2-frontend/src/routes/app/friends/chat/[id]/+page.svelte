<script>
	import { onMount } from "svelte";
  import { page } from '$app/stores';
	import { fromKey } from "ol/tilecoord";
  let chatHeader, chatMessages, chatInputForm, chatInput, messages, username, conversationInfo;
  const friendshipId = $page.params.id;

/*
  Function that creates the message
*/
const createChatMessageElement = (message => {
  const yourUserId = Number(localStorage.getItem('userid'));
  return `
  <div class="message ${message.user_id_sender === yourUserId ? 'blue-bg' : 'gray-bg'}">
    <div class="message-sender">${message.user_id_sender === yourUserId ? 'You' : conversationInfo.username}</div>
    <div class="message-text">${message.content}</div>
    <div class="message-timestamp">${message.sent_datetime}</div>
  </div>
`});

/*
  Function that retrieves friendship info like friend username
*/
async function getFriendshipInformation(friendshipId){
  const yourUserId = Number(localStorage.getItem('userid'));
  const getFriendshipInformationResponse = await fetch('http://localhost:3021/friends/getRelationship',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
        friendshipId: friendshipId,
        yourUserId: yourUserId
    })
  });
  if(!getFriendshipInformationResponse.ok){
    throw new Error("Error retrieving friendship!");
  }
  let friendshipInformation = await getFriendshipInformationResponse.json();
  const getFriendUsernameResponse = await fetch('http://localhost:3020/auth/getUsernameFromTheirId',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
        allRetrievedRelations: friendshipInformation
    })
  });
  if(!getFriendUsernameResponse.ok){
    throw new Error("Error retrieving friend username!");
  }
  friendshipInformation = await getFriendUsernameResponse.json();
  friendshipInformation = friendshipInformation.allRetrievedRelations[0];
  return friendshipInformation;
}

/*
  Function that retrieves conversation
*/
async function getChatConversation(friendshipId){
  const getChatConversationResponse = await fetch('http://localhost:3090/chat/getChatConversation',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
        friendshipId: friendshipId
    })
  });
  if(getChatConversationResponse.ok){
    const chatConversation = await getChatConversationResponse.json();
    return chatConversation;
  }else{
    throw new Error("Error retrieving conversation!");
  }
}

onMount(async() => {
  messages = await getChatConversation(friendshipId);
  conversationInfo = await getFriendshipInformation(friendshipId);
  username = conversationInfo.username;

  messages.forEach((message) => {
    chatMessages.innerHTML += createChatMessageElement(message)
  });

  chatInputForm.addEventListener('submit', sendMessage);

  setInterval(async() => {
    messages = await getChatConversation(friendshipId);
    chatMessages.innerHTML = null;
    messages.forEach((message) => {
      chatMessages.innerHTML += createChatMessageElement(message)
    });
  }, 500);
});

/*
  Function that sends a message and puts it into database
*/
const sendMessage = (async(e) => {
  e.preventDefault()
  const yourUserId = Number(localStorage.getItem('userid'));
  const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false })
  const message = {
    user_id_sender: yourUserId,
    user_id_receiver: conversationInfo.friend_two,
    content: chatInput.value,
    sent_datetime: timestamp,
    friendship_id: friendshipId
  }
  await fetch('http://localhost:3090/chat/sendMessage',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
        message: message
    })
  })
  .catch(error => {
    console.log(error.message);
  })

  /* Clear input field */
  chatInputForm.reset()

  /*  Scroll to bottom of chat messages */
  chatMessages.scrollTop = chatMessages.scrollHeight
});
</script>

<svelte:head>
  <title> Chat with {username} </title>
</svelte:head>

    <div class="chat-container">
      <h2 class="chat-header" bind:this={chatHeader}> <a on:click={() => {window.location.href = "/app/friends"}}>BACK TO CHAT</a> {username}</h2>
    
      <div class="chat-messages"  bind:this={chatMessages}>
      </div>

      <form class="chat-input-form" bind:this={chatInputForm}>
        <input type="text" class="chat-input" bind:this={chatInput} required placeholder="Type here" />
        <button type="submit" class="button send-button">Send</button>
      </form>
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



