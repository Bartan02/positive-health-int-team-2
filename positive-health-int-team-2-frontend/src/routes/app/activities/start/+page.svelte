<script>
    import ActivityManager from '../../../../components/ActivityManager.svelte';
    import Timer from '../../../../components/Timer.svelte';
    import TopMenu from '../../../../components/top-menu.svelte';
    import {
        user
    } from '../../../../stores/user.js';
    import {
        onMount
    } from 'svelte';

    import {
        page
    } from '$app/stores';

    let activityName = $page.url.searchParams.get('activity');
    let activityRunning = true; // Added reactive variable
    let lastRecord = [];
    let userId;

    $: noMenu = activityRunning ? false : true

    async function fetchLastRecord(userId) {
        const url = `https://step-up-api-gateway-2639a76e4388.herokuapp.com/activities/lastrecord?userId=${encodeURIComponent(userId)}`;

        try {
            const response = await fetch(url); // GET request

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching last record:', error);
            // Handle the error accordingly
        }
    }

    onMount(() => {
        // Access localStorage only after component is mounted in the browser
        const userid = localStorage.getItem('userid');
        userId = userid;
        if (userid) {
            console.log(JSON.parse(userid));
            userId = JSON.parse(userid); // Update userId if retrieved from localStorage
        } else {
            // Handle the case where there is no userid in localStorage
            console.log("No user ID found in localStorage.");
            // You might want to set a default value or perform some other action here
            userId = 'defaultUserId'; // This is just an example; adjust as needed.
        }

        // Any other code that needs to run after the component is mounted can go here
    });


    // Handler for when an activity starts
    function handleActivityStart(event) {
        // Logic to handle the start of an activity
        console.log("Activity started with ID:", event.detail.activityId);
        // Additional UI update or state management logic here
    }

    // Handler for when an activity stops
    async function handleActivityStop(event) {
        // Logic to handle the stopping of an activity
        console.log("Activity stopped:", event.detail);
        // Update the activity state
        activityRunning = false;

        try {
            // Await the async call to fetch the last record
            const record = await fetchLastRecord(userId);
            if (record && record[0] && record[0].length > 0) {
                // Assuming the record is in the first array element
                lastRecord = record[0][0];
                console.log(lastRecord.activity_id);
            }
        } catch (error) {
            console.error('Error fetching last record:', error);
            // Handle the error accordingly, maybe set an error state
        }
    }
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

<!-- Activity control button -->

<!-- Additional UI elements -->

<body>
    <div class="min-h-screen" style="background: F6F7FB;">
        <TopMenu noMenu={noMenu} menuLabel={activityName} />
        <div class="w-full mx-auto" style="width: 90%;">
            {#if activityRunning}
                <ActivityManager 
                    userId={userId} 
                    activityName={activityName}
                    on:activityStarted={handleActivityStart} 
                    on:activityStopped={handleActivityStop}
                />
            {:else}
                <h1 class="text-4xl font-bold text-center bg-clip-text text-transparent" style="margin-top: 81px; background-image: linear-gradient(180deg, #F65800 0%, #F00 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                    ACTIVITY RESULTS
                  </h1>
                  
                
                <div class="grid grid-cols-2 grid-rows-2 gap-4" style="padding-top: 16px;">
                    <!-- Four empty white boxes -->
                    <div class="bg-white rounded-lg aspect-ratio-1" style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25); display: flex; align-items: center; justify-content: center; text-align: center; background: linear-gradient(180deg, #F65800 0%, #F00 100%); -webkit-background-clip: text; background-clip: text; color: transparent;">
                        Top speed: <br> { lastRecord.maximum_speed } km/h
                    </div>
                    <div class="bg-white rounded-lg aspect-ratio-1" style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25); display: flex; align-items: center; justify-content: center; text-align: center; background: linear-gradient(180deg, #F65800 0%, #F00 100%); -webkit-background-clip: text; background-clip: text; color: transparent;">
                        Average speed: <br> { lastRecord.averageSpeed} km/h
                    </div>
                    <div class="bg-white rounded-lg aspect-ratio-1" style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25); display: flex; align-items: center; justify-content: center; text-align: center; background: linear-gradient(180deg, #F65800 0%, #F00 100%); -webkit-background-clip: text; background-clip: text; color: transparent;">
                        Distance: <br> { Number(lastRecord.distance).toFixed(2) } meters
                    </div>
                    <div class="bg-white rounded-lg aspect-ratio-1" style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25); display: flex; align-items: center; justify-content: center; text-align: center; background: linear-gradient(180deg, #F65800 0%, #F00 100%); -webkit-background-clip: text; background-clip: text; color: transparent;">
                        Sprint distance: <br> { Number(lastRecord.sprintDistance).toFixed(2) } meters
                    </div>
                    <div class="bg-white rounded-lg aspect-ratio-1" style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25); display: flex; align-items: center; justify-content: center; text-align: center; background: linear-gradient(180deg, #F65800 0%, #F00 100%); -webkit-background-clip: text; background-clip: text; color: transparent;">
                        Calories burnt: <br> { lastRecord.calories_burned } kcal
                    </div>
                    <div class="bg-white rounded-lg aspect-ratio-1" style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25); display: flex; align-items: center; justify-content: center; text-align: center; background: linear-gradient(180deg, #F65800 0%, #F00 100%); -webkit-background-clip: text; background-clip: text; color: transparent;">
                        Time: <br> { lastRecord.elapsedTime }
                    </div>

                    <div class="col-span-2 text-center mt-4">
                        <a href="/app/activities" class="inline-block px-10 py-3 text-xl font-bold text-white rounded-full bg-gradient-to-br from-orange-500 to-red-600 shadow-lg hover:bg-orange-600 focus
                        :outline-none focus:ring-2 focus:ring-orange-300" role="button" style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);">
                            FINISH
                        </a>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</body>