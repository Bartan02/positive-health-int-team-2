<script>
    import { onMount } from 'svelte';
    import TopMenu from '../../../components/top-menu.svelte';
  
    let faqs = [
      { 
        question: 'How can I start a new activity?', 
        answer: 'Navigate to the "Activities page" and select the activity you want to start, such as running, basketball, or swimming. On the "Start activity" page, confirm the details and then tap the "Start the activity" button to begin tracking your performance.', 
      },
      { 
        question: 'How can I find and add friends to chat with on the app?', 
        answer: 'To add friends, go to the "Chat page" and use the search bar to find friends by their username. Once you find your friends, you can add them by tapping the "+" icon next to their name. They will appear in your friends list, and you can start chatting by selecting their name.', 
      },
      { 
        question: 'Can I edit my profile information after setting up my account?', 
        answer: 'Yes, you can edit your profile information at any time. Go to the "Profile page" and tap on your profile picture or the "Edit" button. From there, you can update your personal details, profile picture, and other settings.', 
      },
      { 
        question: "What should I do if the app isn't recording my activity correctly?", 
        answer: "If your activity isn't being recorded correctly, ensure that you have a stable GPS signal and that you've given the app the necessary permissions to access your location. If the issue persists, try restarting the app or contact our support team for further assistance." , 
      },
    ];
  </script>
  
  <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap');
    * {
        font-family: 'Montserrat', sans-serif;
        font-weight: bold;
    }
  
    .question {
      cursor: pointer;
    }
  
    summary::marker {
        color: #F65800;
        font-size: 1.2em;
    }
  </style>
  
  <body>
    <div class="min-h-screen bg-[#F6F7FB]">
      <TopMenu menuLabel="FAQ" />
      <div style="padding-top: 81px;"></div>
      <div class="w-full mx-auto" style="width: 90%;">
        {#each faqs as faq}
          <details class="bg-white rounded-lg p-4 mb-2 w-full max-w-md mx-auto" style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);">
            <summary class="question">{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        {/each}
      </div>
    </div>
  </body>
  