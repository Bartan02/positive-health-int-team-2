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

	.aspect-ratio-1 {
  		aspect-ratio: 1 / 1;
	}
</style>

<body>
    <div class="min-h-screen" style="background: F6F7FB;">
		<TopMenu menuLabel="Home" isHome={true} />
        <!-- Frame for all components, setting the width to 90% of the viewport -->
        <div class="w-full mx-auto" style="width: 90%;">
            <DayMeter />
            <BigOrangeButton buttonText="Welcome" subText="Let's start an activity?" iconUrl="/Running-icon-white.png" />


            <h3 style="margin-top: 16px; background: linear-gradient(180deg, #F65800 0%, #F00 100%);
           -webkit-background-clip: text;
           color: transparent;
           background-clip: text;">Shortcuts: </h3>

            <!-- Grid container for the boxes -->
            <div class="grid grid-cols-2 grid-rows-2 gap-4" style="padding-top: 16px;">
                <!-- Four empty white boxes -->
                <div class="bg-white rounded-lg aspect-ratio-1" style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);"></div>
                <div class="bg-white rounded-lg aspect-ratio-1" style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);"></div>
                <div class="bg-white rounded-lg aspect-ratio-1" style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);"></div>
                <div class="bg-white rounded-lg aspect-ratio-1" style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);"></div>
            </div>
            
        </div>
    </div>
</body>
