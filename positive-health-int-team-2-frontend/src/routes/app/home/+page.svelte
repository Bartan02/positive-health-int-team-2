<script>
	import TopMenu from '../../../components/top-menu.svelte';
	import DayMeter from '../../../components/DayMeter.svelte';
	import BigOrangeButton from '../../../components/BigOrangeButton.svelte';
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap');
    * {
        font-family: 'Montserrat', sans-serif;
        font-weight: bold;
    }
</style>

<body>
	<div class="flex flex-col w-screen h-screen"
		style="background: F6F7FB">
		<TopMenu menuLabel="Home" isHome = true />
		<DayMeter />

		<BigOrangeButton buttonText="Welcome" subText="Let's start an activity?" iconUrl="/Running-icon-white.png" />
	</div>
</body>