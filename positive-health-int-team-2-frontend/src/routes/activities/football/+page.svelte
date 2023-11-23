<style>
  .burger{
    width: 50px;
    height: 50px;
  }
</style>

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

<!-- Activity control button -->

<!-- Additional UI elements -->

<div class="bg-white p-4">
  <div class="flex items-center mb-4">
    <div class="ml-4 mt-4">
       <a href=""><img src="/burgermenu.png" class="burger"></a>
    </div>

    <div class="flex-grow text-center mt-4 mr-12">
        <p class= "text-4xl text-orange-500 font-bold">Friends</p>
    </div>
   </div>

   <ActivityManager 
  {userId} 
  on:activityStarted={handleActivityStart} 
  on:activityStopped={handleActivityStop} 
/>
  

    <Timer />
    <p> Distance Traveled: </p>
   
  
    <!-- Pagination -->
    <div class="flex justify-center items-center space-x-6">
      <div class="text-gray-600 text-4xl font-bold">&lt;</div>
      <div class="bg-orange-600 p-8 rounded-full text-white text-3xl flex items-center justify-center w-12 h-12">1</div>
      <div class="text-gray-600 text-3xl">2</div>
      <div class="text-gray-600 text-3xl">3</div>
      <div class="text-gray-600 text-4xl font-bold">&gt;</div>
    </div>

  </div>
  