<script>
  import ActivityManager from '../../../../components/ActivityManager.svelte';
  import Timer from '../../../../components/Timer.svelte';
  import SideMenu from '../../../../components/side-menu.svelte';
  import { user } from '../../../../stores/user.js';
  import { onMount } from 'svelte';


  let userId;

  onMount(() => {
    // Access localStorage only after component is mounted in the browser
    const userid = localStorage.getItem('userid');
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
  }
</script>

<!-- Activity control button -->

<!-- Additional UI elements -->

<SideMenu />

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