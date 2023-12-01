<script>
    import SideMenu from '../../../../components/side-menu.svelte';
    import CurrenSessionDistanceAvarage from '../../../../components/CurrenSessionDistanceAvarage.svelte';
    import CurrentSessionTopSpeed from '../../../../components/CurrentSessionTopSpeed.svelte';
</script>
<div class="bg-gray-100 p-4">
    <div class="flex items-center">
        <div class="flex-grow text-right">
          <div class="ml-4">
            <SideMenu/>
           </div>
          <div>
            <p class= "text-4xl text-orange-500 font-bold ">Stats</p>
          </div>
        </div>
    </div>
    <div>
        <h1 class="text-bold text-3xl text-right">Training Session</h1>
    </div>

   <CurrentSessionTopSpeed/>
   <CurrenSessionDistanceAvarage/>



   <div class="mt-1 w-64 flex items-center justify-center mx-auto">
    <button class="bg-orange-500 text-white px-6 py-3 rounded-full text-2xl">See Details</button>
</div>
</div>
