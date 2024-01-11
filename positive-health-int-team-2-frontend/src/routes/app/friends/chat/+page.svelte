<script>
    import Talk from 'talkjs';
    import { onMount } from 'svelte';
  
    let chatboxEl;
  
    onMount(async () => {
      await Talk.ready;
  
      const currentUser = new Talk.User({
        id: '1',
        name: 'Henry Mill',
        email: 'henrymill@example.com',
        photoUrl: 'henry.jpeg',
        welcomeMessage: 'Hello!',
        role: 'default',
      });
  
      const otherUser = new Talk.User({
        id: '2',
        name: 'Jessica Wells',
        email: 'jessicawells@example.com',
        photoUrl: 'jessica.jpeg',
        welcomeMessage: 'Hello!',
        role: 'default',
      });
  
      const session = new Talk.Session({
        appId: 'txpxbqE3',
        me: currentUser,
      });
  
      const conversationID = Talk.oneOnOneId(currentUser, otherUser);
      const conversation = session.getOrCreateConversation(conversationID);
      conversation.setParticipant(currentUser);
      conversation.setParticipant(otherUser);
  
      const chatbox = session.createChatbox();
      chatbox.select(conversation);
      chatbox.mount(chatboxEl);
    });
  </script>
  
  <style>
    .body {
        overflow-y: hidden; /* Hide horizontal scrollbar */
    }
    /* Center the chatbox and make it full-width */
    div {
      width: 100%;
      margin: 0 auto;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh; /* Set the height as needed */
    }
  </style>

<body>
  <div bind:this={chatboxEl} />
</body>
  
  


