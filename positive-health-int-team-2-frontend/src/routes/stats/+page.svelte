<style>
    body {
    font-family: 'Spartan', sans-serif;
    }
</style>

  
<script>
    import SideMenu from '../../components/side-menu.svelte';
    import CurrenSession from '../../components/CurrenSessionDistanceAvarage.svelte';
</script>
  

<div class="bg-gray-100 p-4">
    <div class="flex items-center">
      <div class="flex-grow text-right mt-1 mb-3">
        <div class="ml-4">
          <SideMenu/>
         </div>
        <div>
          <p class= "text-4xl text-orange-500 font-bold ">Stats</p>
        </div>
      </div>
      </div>

    <a href="/stats/currentsession">
     <div class="w-100 h-32 bg-orange-500 rounded-lg relative overflow-hidden mt-8 mb-8">
        <!-- Text in the top left corner -->
        <p class="absolute top-4 left-4 text-white font-bold text-3xl ">Current Session</p>
        <p class="absolute top-12 left-4 text-grey font-bold text-xl ">Basketball</p>
        <!-- Image container in the bottom right corner -->
        <div class="absolute bottom-0 right-0">
            <!-- Replace the 'your-image.jpg' with your actual image source -->
            <img src="basketball.png" alt="Your Image" class="w-16 h-16 object-cover">
        </div>
    </div>
    </a>

    <div class="w-100 h-32 bg-orange-500 rounded-lg relative overflow-hidden mt-8 mb-8">
        <!-- Text in the top left corner -->
        <p class="absolute top-4 left-4 text-white font-bold text-3xl ">Friends Leaderboard</p>

        <!-- Image container in the bottom right corner -->
        <div class="absolute bottom-0 right-0">
            <!-- Replace the 'your-image.jpg' with your actual image source -->
            <img src="Friends.png" alt="Your Image" class="w-16 h-16 object-cover">
        </div>
    </div>

    <div class="w-100 h-32 bg-orange-500 rounded-lg relative overflow-hidden mt-8 mb-8">
        <!-- Text in the top left corner -->
        <p class="absolute top-4 left-4 text-white font-bold text-3xl ">Global Leaderboard</p>

        <!-- Image container in the bottom right corner -->
        <div class="absolute bottom-0 right-0">
            <!-- Replace the 'your-image.jpg' with your actual image source -->
            <img src="Crown.png" alt="Your Image" class="w-16 h-16 object-cover">
        </div>
    </div>
</div>

