<script>
	import SideMenu from '../../components/side-menu.svelte';
	let isOpen = false;
</script>

<div class="flex justify-between flex-col w-screen h-screen">
	<SideMenu {isOpen} />

	<div class="h-1/5 w-full text-2xl font-bold center">
		<h2>Welcome, @USER !</h2>
	</div>

	<div class="h-full w-full px-3 pb-20 gap-5 grid grid-cols-2 grid-rows-2">
		<div class="bg-gray-200 h-full w-full border-b-2 border-x-2 border-orange-500 rounded-3xl">
			<div class="bg-slate-200 h-1/4 w-full center flex-col border-2 border-orange-500 rounded-3xl">
				<h2>Activities</h2>
				<h3 class="text-xs">Today</h3>
			</div>
			<div class="center flex-col center mt-10">
				<h2 class="text-orange-500 text-xl font-bold">StepUp!</h2>
				<h3 class="text-center">You have not done any activities yet.</h3>
			</div>
		</div>

		<div class="bg-gray-200 h-full w-full border-b-2 border-x-2 border-orange-500 rounded-3xl">
			<div class="h-1/4 w-full center flex-col border-2 border-orange-500 rounded-3xl">
				<h2>Daily Stats</h2>
			</div>
			<div class="center flex-col gap-2 p-2">
				<div class="flex justify-between w-full h-10 bg-white rounded-3xl center">
					<img class="w-8 h-8 ml-2" src="cal.png">
					<h2 class="mr-2 text-orange-500 text-xl">95</h2>
				</div>
				<div class="flex justify-between w-full h-10 bg-white rounded-3xl center">
					<img class="w-8 h-8 ml-2" src="footsteps.png">
					<h2 class="mr-2 text-orange-500 text-xl">10150</h2>
				</div>
				<div class="flex justify-between w-full h-10 bg-white rounded-3xl center">
					<img class="w-8 h-8 ml-2" src="calories.png">
					<h2 class="mr-2 text-orange-500 text-xl">349</h2>
				</div>
			</div>
		</div>

		<div class="bg-white h-full w-full border-b-2 border-x-2 border-orange-500 rounded-3xl">
			<div class="bg-slate-200 h-1/4 w-full center flex-col border-2 border-orange-500 rounded-3xl">
				<h2>Recent Chat</h2>
			</div>

			<div class="flex flex-col gap-2 p-2">
				
<div class="flex items-center gap-4">
    <div class="relative">
		<img class="w-10 h-10 rounded-full" src="profilepicture.jpg" alt="">
		<span class="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
	</div>
    <div class="font-medium dark:text-white">
        <div>Jese Leos</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">Where ya at bro?</div>
	</div>
</div>

		
			</div>
		</div>

		<div class="bg-emerald-200 h-full w-full border border-orange-500 rounded-3xl" />
	</div>
</div>
