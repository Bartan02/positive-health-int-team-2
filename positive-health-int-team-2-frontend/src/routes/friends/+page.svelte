<script>
    import SideMenu from '../../components/side-menu.svelte';
</script>

<body class="bg-gray-100 h-screen flex flex-col p-4">

    <!-- First container -->
    <div class="flex items-center mb-4">
        <div class="ml-4 mb-5">
            <SideMenu/>
        </div>
        <div class="flex-grow text-center mt-4 mr-12">
            <p class= "text-4xl text-orange-500 font-bold">Friends</p>
        </div>
    </div>

    <!-- Second container -->
    <a href="">
    <div class="flex bg-white rounded-lg p-4 shadow-md w-full max-w-md mx-auto mt-0 mb-4">

        <!-- User avatar image on the top-left -->
        <div class="mr-3">
            <img src="profilepicture.jpg" class="w-18 h-16 rounded-full">
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

    </div>
</a>
    

    <!-- Third container -->
    <div class="flex justify-end space-x-4 mt-auto">

        <!-- Button 1 -->
        <button class="bg-orange-500 rounded-full p-2">
            <a href="friends/find"><img src="plus.png"  class="w-12 h-12"></a>
        </button>

        <!-- Button 2 -->
        <button class="bg-orange-500 rounded-full p-2">
            <a href=""><img src="search.png"  class="w-12 h-12"></a>
        </button>

    </div>
</body>