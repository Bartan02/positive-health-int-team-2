<script>
	import TopMenu from '../../../components/top-menu.svelte';
	import DayMeter from '../../../components/DayMeter.svelte';
</script>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Spartan:wght@400;500;600;700&display=swap');

	body {
		font-family: 'Spartan', sans-serif;
	}
</style>

<body>
	<div class="flex justify-between flex-col w-screen h-screen"
		style="background: F6F7FB">
		<TopMenu menuLabel="Home" isHome = true />
		<DayMeter />
	</div>
</body>