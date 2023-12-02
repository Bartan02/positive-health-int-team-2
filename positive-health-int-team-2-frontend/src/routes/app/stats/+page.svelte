<style>
    @import url('https://fonts.googleapis.com/css2?family=Spartan:wght@400;500;600;700&display=swap');

    body {
        font-family: 'Spartan', sans-serif;
    }
</style>


<script>
    import SideMenu from '../../../components/side-menu.svelte';
</script>

<body>
    <SideMenu />

    <div class="fixed top-4 right-4 z-20">
        <p class="text-4xl text-orange-500 font-bold">Stats</p>
    </div>

    <div class="pt-16 bg-gray-100 min-h-screen p-4">
        <a href="/app/stats/currentsession">
            <div
                class="w-full h-32 bg-orange-500 rounded-lg overflow-hidden mt-8 mb-8 flex justify-between items-center p-4">
                <div class="flex flex-col justify-start">
                    <p class="text-white font-bold text-3xl">Current Session</p>
                    <p class="text-grey font-bold text-xl">Basketball</p>
                </div>

                <div class="self-end flex-shrink-0">
                    <img src="/basketball.png" alt="Basketball" class="w-16 h-16 object-cover">
                </div>
            </div>
        </a>

        <div
            class="w-full h-32 bg-orange-500 rounded-lg overflow-hidden mt-8 mb-8 flex justify-between items-center p-4">
            <div class="flex flex-col justify-start">
                <p class="text-white font-bold text-3xl">Friends Leaderboard</p>
            </div>

            <div class="self-end flex-shrink-0">
                <img src="/Friends.png" alt="Friends" class="w-16 h-16 object-cover">
            </div>
        </div>

        <div
            class="w-full h-32 bg-orange-500 rounded-lg overflow-hidden mt-8 mb-8 flex justify-between items-center p-4">
            <div class="flex flex-col justify-start">
                <p class="text-white font-bold text-3xl">Global Leaderboard</p>
            </div>

            <div class="self-end flex-shrink-0">
                <img src="/Crown.png" alt="Crown" class="w-16 h-16 object-cover">
            </div>
        </div>
    </div>
</body>