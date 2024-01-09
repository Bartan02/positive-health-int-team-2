<script>
  import ActivityManager from '../../../../components/ActivityManager.svelte';
  import Timer from '../../../../components/Timer.svelte';
  import SideMenu from '../../../../components/top-menu.svelte';
  import { user } from '../../../../stores/user.js';
  import { onMount } from 'svelte';


  let userId;
  let activityRunning = true; // Added reactive variable
  let lastRecord = [];

  async function fetchLastRecord(userId) {
    const url = 'http://localhost:3015/activities/lastrecord';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching last record:', error);
        // Handle the error according to your application's needs
    }
}

  onMount(() => {
    // Access localStorage only after component is mounted in the browser
    const userid = localStorage.getItem('userid');
    userId = userid;
    if (userid) {
      console.log(JSON.parse(userid));
      userId = JSON.parse(userid); // Update userId if retrieved from localStorage
    } else {
      // Handle the case where there is no userid in localStorage
      console.log("No user ID found in localStorage.");
      // You might want to set a default value or perform some other action here
      userId = 'defaultUserId'; // This is just an example; adjust as needed.
    }

    // Any other code that needs to run after the component is mounted can go here
    
  });
 

  // Handler for when an activity starts
  function handleActivityStart(event) {
      // Logic to handle the start of an activity
      console.log("Activity started with ID:", event.detail.activityId);
      // Additional UI update or state management logic here
  }

  // Handler for when an activity stops
  function handleActivityStop(event) {
      // Logic to handle the stopping of an activity
      console.log("Activity stopped:", event.detail);
      // Additional UI update or state management logic here
      activityRunning = false; // Update the activity state
  }
</script>

<!-- Activity control button -->

<!-- Additional UI elements -->

<SideMenu />

{#if activityRunning}

<div class="fixed right-4 z-20">
    <p class="text-4xl text-orange-500 mt-4 font-bold">Activities</p>
</div>

<div class="bg-gray-100 p-4 pt-16">
    <ActivityManager 
      userId={userId} 
      on:activityStarted={handleActivityStart} 
      on:activityStopped={handleActivityStop}
    />

  </div>

  {:else}

<!-- Render these elements only when the activity has stopped -->
<div class="results-container">
  <!-- Your stats and results components here -->
  <h1> SPACE TAG</h1>
  <h1> SPACE TAG</h1>
  <h1> SPACE TAG</h1>
  <h1> SPACE TAG</h1>
  <h1> SPACE TAG</h1>
  <h1> SPACE TAG</h1>
  <h1>Total time:</h1>
  <h1>Total distance: </h1>
</div>
<!-- <button class="finish-button" on:click={redirectToActivity}>Finish</button> -->
  {/if}