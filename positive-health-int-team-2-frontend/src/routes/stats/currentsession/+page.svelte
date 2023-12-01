<script>
    import SideMenu from '../../../components/side-menu.svelte';
    import CurrenSessionDistanceAvarage from '../../../components/CurrenSessionDistanceAvarage.svelte';
    import CurrentSessionTopSpeed from '../../../components/CurrentSessionTopSpeed.svelte';
</script>
<div class="bg-white p-4">
    <div class="ml-4">
        <SideMenu />
    </div>
    <div class="flex items-center">
        <div class="flex-grow text-center  mr-6">
            <p class="text-4xl text-orange-500 font-bold mb-4">Stats</p>
        </div>
    </div>
    <div>
        <h1 class="text-center  text-bold text-4xl mb-3">Training Session</h1>
    </div>

   <CurrentSessionTopSpeed/>
   <CurrenSessionDistanceAvarage/>



   <div class="mt-10 w-64 flex items-center justify-center mx-auto">
    <button class="bg-orange-500 text-white px-6 py-3 rounded-full text-2xl">See Details</button>
</div>
</div>
