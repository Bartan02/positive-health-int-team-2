<script>
  import { onMount } from 'svelte';
  import SideMenu from '../../../components/side-menu.svelte';

  let getResponsePromise;

  onMount(() => {
    getResponsePromise = getResponse();
  });

  async function getResponse() {
    try {
      const res = await fetch(
      `http://localhost:3025/activities/activity`);
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return await res.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw error; // Re-throw the error to be caught by the await block
    }
  }
</script>

<style>
      @import url('https://fonts.googleapis.com/css2?family=Spartan:wght@400;500;600;700&display=swap');
    
    body {
        font-family: 'Spartan', sans-serif;
    }
</style>

<body>
<SideMenu />

<div class="fixed right-4 z-20">
    <p class="text-4xl text-orange-500 mt-4 font-bold">Activities</p>
</div>

<div class="p-4">
 <!-- Grid of activities -->
  <div class="grid grid-cols-2 gap-4 mb-4 pt-16">
    <a href="/app/activities/football">
      <!-- First activity block -->
      <div
        class="bg-white-600 p-8  rounded-lg flex flex-col items-center justify-center border border-4 border-orange-500">
        <!-- Icon -->
        <img src="/run.png" alt="run" class="mb-2">
        <!-- Text -->
        <div class="font-custom text-2xl text-black font-bold">Running</div>
      </div>
    </a>
    <a href="">
      <!-- Second activity block (Repeat the block with different content if needed) -->
      <div
        class="bg-white-600 p-8  rounded-lg flex flex-col items-center justify-center border border-4 border-orange-500">
        <!-- Icon -->
        <img src="/bball.png" alt="Basketball" class="mb-2">
        <!-- Text -->
        <div class="font-custom text-2xl text-black font-bold">Basketball</div>
      </div>
    </a>
  </div>



  <!-- Grid of activities -->
  <div class="grid grid-cols-2 gap-4 mb-4">
    <a href="/app/activities/football">
      <!-- First activity block -->
      <div
        class="bg-white-600 p-8  rounded-lg flex flex-col items-center justify-center border border-4 border-orange-500">
        <!-- Icon -->
        <img src="/footballogo.png" alt="Football" class="mb-2">
        <!-- Text -->
        <div class="font-custom text-2xl text-black font-bold">Football</div>
      </div>
    </a>
    <a href="">
      <!-- Second activity block (Repeat the block with different content if needed) -->
      <div
        class="bg-white-600 p-8 rounded-lg flex flex-col items-center justify-center border border-4 border-orange-500">
        <!-- Icon -->
        <img src="/bicycle.png" alt="Other Activity" class="mb-2">
        <!-- Text -->
        <div class="font-custom text-2xl text-black font-bold">Cycling</div>
      </div>
    </a>
  </div>



  <!-- Grid of activities -->
  <div class="grid grid-cols-2 gap-4 mb-4">
    <a href="">
      <!-- First activity block -->
      <div
        class="bg-white-600 p-8  rounded-lg flex flex-col items-center justify-center border border-4 border-orange-500">
        <!-- Icon -->
        <img src="/skateboard.png" alt="Biking" class="mb-2">
        <!-- Text -->
        <div class="font-custom text-2xl text-black font-bold">Skateboarding</div>
      </div>
    </a>
    <a href="">
      <!-- Second activity block (Repeat the block with different content if needed) -->
      <div
        class="bg-white-600 p-8 rounded-lg flex flex-col items-center justify-center border border-4 border-orange-500">
        <!-- Icon -->
        <img src="/rollerskate.png" alt="Other Activity" class="mb-2">
        <!-- Text -->
        <div class="font-custom text-2xl text-black font-bold">Rollerskating</div>
      </div>
    </a>
  </div>

  <!-- Grid of activities -->
  <div class="grid grid-cols-2 gap-4 mb-4">
    <a href="">
      <!-- First activity block -->
      <div
        class="bg-white-600 p-8 rounded-lg flex flex-col items-center justify-center border border-4 border-orange-500">
        <!-- Icon -->
        <img src="/snowboard.png" alt="Biking" class="mb-2">
        <!-- Text -->
        <div class="font-custom text-2xl text-black font-bold">Snowboarding</div>
      </div>
    </a>
    <a href="">
      <!-- Second activity block (Repeat the block with different content if needed) -->
      <div
        class="bg-white-600 p-8 rounded-lg flex flex-col items-center justify-center border border-4 border-orange-500">
        <!-- Icon -->
        <img src="/ski.png" alt="Other Activity" class="mb-2">
        <!-- Text -->
        <div class="font-custom text-2xl text-black font-bold">Skying</div>
      </div>
    </a>
  </div>

  <!-- Pagination -->
  <div class="flex justify-center items-center space-x-6">
    <div class="text-gray-600 text-4xl font-bold">&lt;</div>
    <div class="bg-orange-600 p-8 rounded-full text-white text-3xl flex items-center justify-center w-12 h-12">1</div>
    <div class="text-gray-600 text-3xl">2</div>
    <div class="text-gray-600 text-3xl">3</div>
    <div class="text-gray-600 text-4xl font-bold">&gt;</div>
  </div>

</div>

</body>