<script>
    import { page } from '$app/stores';
    import TopMenu from '../../../../components/top-menu.svelte';
    import BigOrangeButton from '../../../../components/BigOrangeButton.svelte';

    let activity = $page.url.searchParams.get('activity');
    console.log(activity);

    import Router from 'svelte-spa-router';
    import ActivityOptions from '../records/+page.svelte';
      
  const routes = {
      '/app/activities/records': ActivityOptions,
  };
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
		<TopMenu menuLabel="Activities" subHeader="{activity}" />
        <!-- Frame for all components, setting the width to 90% of the viewport -->
        <div class="w-full mx-auto" style="width: 90%;">
            <div style="margin-top:146.6px"></div> <!--spacer for the Top menu-->
            <BigOrangeButton buttonText="Start the activity" iconUrl="/Sports/Empty/{activity}-icon-empty.png" activityName="{activity}"/>

            <div class="grid grid-cols-2 grid-rows-1 gap-4" style="padding-top: 16px;">
                <a href="/app/activities/records?activity={activity}">
                    <div class="bg-white rounded-lg aspect-ratio-1" style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25); display: flex; align-items: center; justify-content: center; text-align: center; background: linear-gradient(180deg, #F65800 0%, #F00 100%); -webkit-background-clip: text; background-clip: text; color: transparent;">
                        History
                    </div>
                </a>
                <!-- Four empty white boxes -->

                
                <a href="/app/map">
                    <div class="bg-white rounded-lg aspect-ratio-1" style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25); display: flex; align-items: center; justify-content: center; text-align: center; background: linear-gradient(180deg, #F65800 0%, #F00 100%); -webkit-background-clip: text; background-clip: text; color: transparent;">
                        Search for companions
                    </div>
                </a> 
            </div>
        </div>
    </div>
</body>
