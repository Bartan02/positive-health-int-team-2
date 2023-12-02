<script>
	import SideMenu from '../../../components/side-menu.svelte';
</script>

<body>
<div class="flex justify-between flex-col w-screen h-screen">
	<SideMenu />
	<div class="h-20 w-full" />

	<div class="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
		<div class="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md" style="background-image: url(https://images.unsplash.com/photo-1521903062400-b80f2cb8cb9d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80)"></div>
	
		<div class="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
			<h3 class="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">Welcome!</h3>
	
			<div class="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
				<span class="font-bold text-gray-800 dark:text-gray-200"></span>
			</div>
		</div>
	</div>


	<div class="h-full w-full px-3 pb-20 gap-5 grid grid-cols-2 grid-rows-2">
       
		<a href="/app/activities">
		<div class="bg-gray-200 h-full w-full border-b-2 border-x-2 border-orange-500 rounded-3xl">
			<div class="bg-stone-800 h-1/4 w-full center flex-col border-2 border-orange-500 rounded-3xl">
				<h1 class="text-xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-4xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-red-500 from-orange-400">Activities</span></h1>
				<h3 class="text-xs text-white">Today</h3>
			</div>
			<div class="center flex-col center mt-10">
				<h2 class="text-orange-500 text-xl font-bold">StepUp!</h2>
				<h3 class="text-center">You have not done any activities yet.</h3>
			</div>
		</div>
		</a>
	
        <a href="/app/stats">
		<div class="bg-gray-200 h-full w-full border-b-2 border-x-2 border-orange-500 rounded-3xl">
			<div class="bg-stone-800  h-1/4 w-full center flex-col border-2 border-orange-500 rounded-3xl">
				<h1 class="text-xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-4xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-red-500 from-orange-400">Daily Stats</span></h1>
			</div>
			<div class="center flex-col gap-2 p-2">
				<div class="flex justify-between w-full h-10 bg-white rounded-3xl center">
					<img class="w-8 h-8 ml-2" src="/cal.png">
					<h2 class="mr-2 text-orange-500 text-xl">95</h2>
				</div>
				<div class="flex justify-between w-full h-10 bg-white rounded-3xl center">
					<img class="w-8 h-8 ml-2" src="/footsteps.png">
					<h2 class="mr-2 text-orange-500 text-xl">10150</h2>
				</div>
				<div class="flex justify-between w-full h-10 bg-white rounded-3xl center">
					<img class="w-8 h-8 ml-2" src="/calories.png">
					<h2 class="mr-2 text-orange-500 text-xl">349</h2>
				</div>
			</div>
		</div>
		</a>

		<a href="/app/friends">
		<div class="bg-white h-full w-full border-b-2 border-x-2 border-orange-500 rounded-3xl">
			<div class="bg-stone-800  h-1/4 w-full center flex-col border-2 border-orange-500 rounded-3xl">
				<h1 class="text-xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-4xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-red-500 from-orange-400">Recent Chat</span></h1>
			</div>

			<div class="flex flex-col gap-2 p-2">
				<div class="flex items-center gap-4 bg-gray-300 rounded-lg">
					<div>
		                <img class="w-10 h-10 rounded-full" src="/profilepicture.jpg" alt="">
		                <span class="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
	                </div>
                <div class="font-medium dark:text-white">
                        <div>Jese Leos</div>
                        <div class="text-xs text-gray-700 dark:text-gray-400">Where ya at bro?</div>
	            </div>
            </div>
         </div>
	</div>
	</a>

		<div class="bg-emerald-200 h-full w-full border border-orange-500 rounded-3xl" />
	</div>

</div>
</body>
<style>
@import url('https://fonts.googleapis.com/css2?family=Spartan:wght@400;500;600;700&display=swap');

body {
    font-family: 'Spartan', sans-serif;
}
</style>


