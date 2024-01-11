<script>
  import ActivityManager from '../../../../components/ActivityManager.svelte';
  import Timer from '../../../../components/Timer.svelte';
  import SideMenu from '../../../../components/top-menu.svelte';
  import { user } from '../../../../stores/user.js';
  import { onMount } from 'svelte';


  let activityRunning = true; // Added reactive variable
  let lastRecord = [];
  let userId;

  async function fetchLastRecord(userId) {
    const url = `http://localhost:3015/activities/lastrecord?userId=${encodeURIComponent(userId)}`;

    try {
        const response = await fetch(url); // GET request

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching last record:', error);
        // Handle the error accordingly
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
async function handleActivityStop(event) {
    // Logic to handle the stopping of an activity
    console.log("Activity stopped:", event.detail);
    // Update the activity state
    activityRunning = false;
    
    try {
        // Await the async call to fetch the last record
        const record = await fetchLastRecord(userId);
        if (record && record[0] && record[0].length > 0) {
            // Assuming the record is in the first array element
            lastRecord = record[0][0];
            console.log(lastRecord.activity_id);
        }
    } catch (error) {
        console.error('Error fetching last record:', error);
        // Handle the error accordingly, maybe set an error state
    }
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
  <h1 style="margin-top:20%"> Distance: { lastRecord.distance } meters </h1>
  <h1>Maximum speed: { lastRecord.maximum_speed } km/h</h1>
  <h1>Start time: { lastRecord.start_time }</h1>
  <h1>Sprint distance: { lastRecord.sprintDistance} meters</h1>
  <h1>Elapsed time: { lastRecord.elapsedTime }</h1>
</div>
<!-- <button class="finish-button" on:click={redirectToActivity}>Finish</button> -->
  {/if}