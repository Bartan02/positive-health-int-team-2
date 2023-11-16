<script>
    import Timer from "../../../components/Timer.svelte";
    import { startActivity } from "../../../lib/activityService";
    let userId = '12345'; // Example user ID, replace with actual user data
    let startLocation = { latitude: 40.7128, longitude: -74.0060 }; // Example start location

    async function handleStartActivity() {
        try {
            const response = await startActivity(userId, startLocation);
            console.log(response); // Handle the response as needed
        } catch (error) {
            console.error('Error starting activity:', error);
        }
    }
</script>

<button on:click={handleStartActivity}>Start Activity</button>

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
  