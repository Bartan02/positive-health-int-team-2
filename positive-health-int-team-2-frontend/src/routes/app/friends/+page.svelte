<script>
    import SideMenu from '../../../components/top-menu.svelte';
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Spartan:wght@400;500;600;700&display=swap');
    
    body {
        font-family: 'Spartan', sans-serif;
    }

    .flex-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh; /* Full height of the viewport */
    }

    .main-content {
        flex-grow: 1; /* Grow to occupy all available space */
    }
</style>

<body>
    <SideMenu />

    <div class="fixed right-4 z-20">
        <p class="text-4xl text-orange-500 mt-4 font-bold">Friends</p>
    </div>

    <div class="flex-container">
        <div class="main-content pt-16 p-4">
            <!-- Second container -->
            <a href="">
                <div class="flex bg-white rounded-lg p-4 shadow-md w-full max-w-md mx-auto">

                    <!-- User avatar image on the top-left -->
                    <div class="mr-3">
                        <img src="/profilepicture.jpg" class="w-16 h-16 rounded-full">
                    </div>
    
                    <!-- Text content -->
                    <div class="ml-3">
                        <p class="text-gray-800 font-bold text-lg">John Doe</p>
                        <p class="text-gray-800">Hi! Where are you?</p>
                        <div class="flex items-end mt-2">
                            <span class="text-xs text-gray-500">12:34 PM</span>
                            <span class="ml-2 text-xs text-gray-500">Delivered</span>
                        </div>
                    </div>
    
                    <div>
                        <span
                            class="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                            <span class="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                            Available
                        </span>
                    </div>
    
                </div>
            </a>
        </div>

        <!-- Third container -->
        <div class="p-4 bg-white">
            <div class="flex justify-end space-x-4">
                <!-- Button 1 -->
                <div class="bg-orange-500 rounded-full p-2">
                    <a href="/app/friends/find"><img src="/Plus-icon.png" class="w-12 h-12"></a>
                </div>

                <!-- Button 2 -->
                <div class="bg-orange-500 rounded-full p-2">
                    <a href=""><img src="/Search-icon.png" class="w-12 h-12"></a>
                </div>
            </div>
        </div>
    </div>
</body>
