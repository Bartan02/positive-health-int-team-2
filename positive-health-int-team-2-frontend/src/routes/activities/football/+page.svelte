<script>
  import ActivityManager from '../../../components/ActivityManager.svelte';
  import Timer from '../../../components/Timer.svelte';
  import SideMenu from '../../../components/side-menu.svelte';

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

<div class="bg-gray-100 p-4">
  <div class="flex items-center">
    <div class="flex-grow text-right mt-1 mb-3">
      <div class="ml-4">
        <SideMenu/>
       </div>
      <div>
        <p class= "text-4xl text-orange-500 font-bold ">Activity</p>
      </div>
    </div>
    </div>

    <ActivityManager 
      userId={userId} 
      on:activityStarted={handleActivityStart} 
      on:activityStopped={handleActivityStop}
    />

  </div>