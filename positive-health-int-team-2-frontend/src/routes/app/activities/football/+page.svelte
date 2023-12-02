<script>
  import ActivityManager from '../../../../components/ActivityManager.svelte';
  import Timer from '../../../../components/Timer.svelte';
  import SideMenu from '../../../../components/side-menu.svelte';

  let userId = '12345'; // Replace with the actual user ID

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
    <p class="text-4xl text-orange-500 mt-4 font-bold">Friends</p>
</div>

<div class="bg-gray-100 p-4 pt-16">
    <ActivityManager 
      userId={userId} 
      on:activityStarted={handleActivityStart} 
      on:activityStopped={handleActivityStop}
    />

  </div>