<script>
	import SideMenu from '../../components/side-menu.svelte';
</script>

<div class="flex justify-between flex-col w-screen h-screen">
	<SideMenu />
	<div class="h-20 w-full" />
	<div class="bg-red-200 h-20 w-full">
        <h2>Component for navigation and title</h2>
    </div>

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
				<div class="flex justify-between w-full h-10 bg-gray-400 rounded-3xl center">
					<h2>*HEART*</h2>
					<h2>95</h2>
				</div>
				<div class="flex justify-between w-full h-10 bg-gray-400 rounded-3xl center">
					<h2>*STEPS*</h2>
					<h2>10150</h2>
				</div>
				<div class="flex justify-between w-full h-10 bg-gray-400 rounded-3xl center">
					<h2>*CALOR*</h2>
					<h2>349</h2>
				</div>
			</div>
		</div>

		<div class="bg-gray-200 h-full w-full border-b-2 border-x-2 border-orange-500 rounded-3xl">
			<div class="bg-slate-200 h-1/4 w-full center flex-col border-2 border-orange-500 rounded-3xl">
				<h2>Recent Chat</h2>
			</div>
			<div class="flex flex-col gap-2 p-2">
				<div class="flex justify-start center">
					<div class="h-full">
						<h2 class="left-2 w-10 h-10 bg-gray-400 rounded-3xl center">*IMG*</h2>
					</div>
					<div class="center h-1/2 w-full bg-gray-300 rounded-3xl">
						<h2>Hello! U up?</h2>
					</div>
				</div>
				<div class="flex justify-start center">
					<div class="h-full">
						<h2 class="left-2 w-10 h-10 bg-gray-400 rounded-3xl center">*IMG*</h2>
					</div>
					<div class="center h-1/2 w-full bg-gray-300 rounded-3xl">
						<h2>You ariving?</h2>
					</div>
				</div>
			</div>
		</div>

		<div class="bg-emerald-200 h-full w-full border border-orange-500 rounded-3xl" />
	</div>
</div>
