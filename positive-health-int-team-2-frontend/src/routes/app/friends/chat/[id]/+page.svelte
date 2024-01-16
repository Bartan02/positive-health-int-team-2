<script>
	import { onMount } from "svelte";
  import { page } from '$app/stores';
	import { fromKey } from "ol/tilecoord";
  import TopMenu from '../../../../../components/top-menu.svelte';
  let chatHeader, chatMessages, chatInputForm, chatInput, messages, username, conversationInfo;
  const friendshipId = $page.params.id;

/*
  Function that creates the message
*/
const createChatMessageElement = (message) => {
  const yourUserId = Number(localStorage.getItem('userid'));
  const isYourMessage = message.user_id_sender === yourUserId;
  const avatarText = isYourMessage ? 'Me' : conversationInfo.username.charAt(0).toUpperCase();
  const bubbleColor = isYourMessage ? '#F00' : '#F65800';
  const avatarTextColor = bubbleColor; // Same color as the message bubble
  const textColor = 'white';
  const flexDirection = isYourMessage ? 'row-reverse' : 'row';
  const textAlign = isYourMessage ? 'flex-end' : 'flex-start';
  const timeMargin = isYourMessage ? 'margin-right: 10px;' : 'margin-left: 10px;';
  const formattedTime = message.sent_datetime.slice(0, -3);

  return `
    <div class="message" style="display: flex; flex-direction: ${flexDirection}; align-items: center; margin-bottom: 1em;">
      <div style="min-width: 40px; height: 40px; border-radius: 50%; background-color: white; color: ${avatarTextColor}; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-left: 10px; margin-right: 10px; box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);">
        ${avatarText}
      </div>
      <div style="background-color: ${bubbleColor}; padding: 10px; border-radius: 20px; color: ${textColor}; display: flex; flex-direction: column; align-items: ${textAlign}; max-width: 60%;">
        <div>${message.content}</div>
      </div>
      <div style="${timeMargin} color: #65676b; font-size: 0.75em; white-space: nowrap;">
        ${formattedTime}
      </div>
    </div>
  `;
};

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

function scrollToBottom() {
  if (chatMessages) {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

onMount(async() => {
  messages = await getChatConversation(friendshipId);
  conversationInfo = await getFriendshipInformation(friendshipId);
  username = conversationInfo.username;

  messages.forEach((message) => {
    chatMessages.innerHTML += createChatMessageElement(message);
  });
  
  scrollToBottom(); // Scroll to bottom after initial load

  chatInputForm.addEventListener('submit', sendMessage);

  setInterval(async() => {
    messages = await getChatConversation(friendshipId);
    chatMessages.innerHTML = '';
    messages.forEach((message) => {
      chatMessages.innerHTML += createChatMessageElement(message);
    });
    // Do not call scrollToBottom here
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

<body>
  <div class="min-h-screen bg-[#F6F7FB]">
          <!-- Frame for all components, setting the width to 90% of the viewport -->
      <TopMenu menuLabel="Chat" />
      <div class="w-full mx-auto" style="width: 90%;">

        <div class="chat-container h-screen bg-[#F6F7FB]" style="padding-top: 146.6px">
          <div class="bg-white rounded-2xl flex items-center justify-center" style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25); height:10%; z-index:5; position: relative;">
            <a on:click={() => {window.location.href = "/app/friends"}} class="rounded-full" style="margin-left: 10px;background:linear-gradient(180deg, #F65800 0%, #F00 100%); position: absolute; left: 0; top: 50%; transform: translateY(-50%);">
              <img src="/Exit-icon.png" alt="" class="rotate-180" style="height: 40px; width: 40px;">
            </a>
            <h2 class="chat-header" bind:this={chatHeader} style="z-index: 5;">{username}</h2>
          </div>
          
          <div class="flex justify-center items-start" style="height: 50%;">
            <div class="bg-white rounded-bl-2xl rounded-br-2xl" style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25); height: 100%; width: 80%; z-index: 4; overflow: hidden;">
              <div class="chat-messages" bind:this={chatMessages} style="max-height: 100%; overflow-y: auto; padding: 10px;"></div>
            </div>            
          </div>

          <form class="chat-input-form flex items-center gap-2 mt-2 mx-auto w-full max-w-lg" bind:this={chatInputForm}>
            <input type="text" class="flex-grow bg-white rounded-full border-none h-12" style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);" bind:this={chatInput} required placeholder="Type here" />
            <button type="submit" class="bg-white rounded-full w-12 h-12 flex justify-center items-center p-0" style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);">
              <img src="/Send-icon.png" alt="Send" class="h-full w-full object-cover rounded-full">
            </button>
          </form>                  
        </div>
    </div>
  </div>
</body>

    <style>
          @import url('https://fonts.googleapis.com/css2?family=Spartan:wght@400;500;600;700&display=swap');      
    * {
        font-family: 'Montserrat', sans-serif;
    }
    
.message {
  display: flex;
  align-items: center;
  margin-bottom: 1em;
}

.message-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #F65800; /* Or any other color you prefer */
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  font-weight: bold;
}

.message-bubble {
  display: flex;
  align-items: flex-end;
  background-color: #F00; /* Or any other color you prefer */
  padding: 10px;
  border-radius: 20px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.chat-messages {
  max-height: 100%;
  overflow-y: auto;
  padding: 10px;
}

.message-sent {
  flex-direction: row-reverse;
}

.message-received {
  flex-direction: row;
}

.message-text {
  color: white;
  margin-right: 10px;
}

.message-timestamp {
  font-size: 0.75em;
  color: rgba(255, 255, 255, 0.8);
}

    </style>



