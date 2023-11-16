<script>
    import Geolocation from "../../../components/Geolocation.svelte";
    import Timer from "../../../components/Timer.svelte";
    import { onMount, onDestroy} from 'svelte';
    import { startActivity, stopActivity, updateLocation} from "../../../lib/activityService";
    let userId = '12345'; // Example user ID, replace with actual user data
    let startLocation = { latitude: 40.7128, longitude: -74.0060 }; // Example start location
    let isActivityOngoing = false;
    let activityId;
    let watchId;

    async function handleStartActivity() {
        try {
            const response = await startActivity(userId, startLocation);
            console.log(response); // Handle the response as needed
            activityId = response.activityId;
            isActivityOngoing = true;
        } catch (error) {
            console.error('Error starting activity:', error);
        }
    }
    async function handleStopActivity() {
      try {
        const response = await stopActivity(activityId);
        console.log(response.message);
        isActivityOngoing = false;
        activityId = null;
      } catch (error) {
        console.error('Error stopping activity:', error);
      }
    }

    


    onMount(() => {
        if ('geolocation' in navigator) {
            watchId = navigator.geolocation.watchPosition(
                async (position) => {
                    // Only attempt to update the location if an activity has been started
                    if (activityId) {
                        const currentLocation = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        };
                        console.log(currentLocation);
                        await updateLocation(activityId, currentLocation);
                    }
                },
                (error) => {
                    console.error('Error getting location:', error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10,
                    maximumAge: 0
                }
            );
    } else {
        console.log('Geolocation is not supported by this browser.');
    }
});

onDestroy(() => {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
    }
}); 

</script>




<button on:click={isActivityOngoing ? handleStopActivity : handleStartActivity}>
  {isActivityOngoing ? 'Stop Activity' : 'Start Activity'}
</button>



<div class="bg-white p-4">
    <!-- Top bar with icons and title -->
    <div class="flex justify-between items-center mb-4">
      <div class="text-orange-600">12:00</div>
      <div class="text-4xl text-orange-500">Activities</div>
      <div class="text-gray-800">94%</div>
    </div>
  

    <Timer />
    <p> Distance Traveled: </p>
   
  
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
  