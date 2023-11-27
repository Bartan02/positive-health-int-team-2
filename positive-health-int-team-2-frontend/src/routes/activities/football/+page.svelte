<script>
  import ActivityManager from '../../../components/ActivityManager.svelte';
  import Timer from '../../../components/Timer.svelte';

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

<ActivityManager 
  {userId} 
  on:activityStarted={handleActivityStart} 
  on:activityStopped={handleActivityStop} 
/>


<!-- Activity control button -->

<!-- Additional UI elements -->

<div class="bg-white p-4">
    <!-- Top bar with icons and title -->
    <div class="flex justify-between items-center mb-4">
      <div class="text-orange-600">12:00</div>
      <div class="text-4xl text-orange-500">Activities</div>
      <div class="text-gray-800">94%</div>
    </div>
  


   
  
    <!-- Pagination -->
    <div class="flex justify-center items-center space-x-2 mb-4">
      <div class="text-gray-600">&lt;</div>
      <div class="text-red-600">1</div>
      <div class="text-gray-600">2 3</div>
      <div class="text-gray-600">&gt;</div>
    </div>
  
    <!-- Bottom navigation -->
    <div class="fixed bottom-0 inset-x-0 bg-white p-2">
      <div class="grid grid-cols-5 gap-4">
        <!-- Each nav icon -->
        <div class="flex flex-col items-center">
          <img src="/path-to-your-home-icon.svg" alt="Home" class="mb-1">
          <div>Home</div>
        </div>
        <!-- Repeat for other nav items -->
      </div>
    </div>
  </div>
  