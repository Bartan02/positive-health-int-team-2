<script>
	import TopMenu from '../../../components/top-menu.svelte';
	import DayMeter from '../../../components/DayMeter.svelte';
	import BigOrangeButton from '../../../components/BigOrangeButton.svelte';
    import { onMount } from 'svelte';

    let userId;
	let activities = [];
    let weeklyDistance = 0;
    let weeklyCaloriesBurned = 0;
    let weeklyElapsedTime = 0; // Use this to accumulate total seconds

	async function fetchAllRecords(userId) {
		const url = `https://step-up-api-gateway-2639a76e4388.herokuapp.com/activities/records?userId=${encodeURIComponent(userId)}`;

		try {
			const response = await fetch(url); // GET request

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			return data[0];
		} catch (error) {
			console.error('Error fetching last record:', error);
			// Handle the error accordingly
		}
	}

    function convertToHours(timeString) {
        const [hours, minutes, seconds] = timeString.split(':').map(Number);
        return hours + minutes / 60 + seconds / 3600;
    }

	function loadActivities() {
		// This function remains synchronous
		const userid = localStorage.getItem('userid');
		userId = userid;
		if (userid) {
			console.log(JSON.parse(userid));
			userId = JSON.parse(userid); // Update userId if retrieved from localStorage
		} else {
			console.log('No user ID found in localStorage.');
			userId = 'defaultUserId'; // This is just an example; adjust as needed.
		}

		// Call the async function without awaiting it
		fetchAllRecords(userId)
        .then((records) => {
            activities = records;
            console.log(activities);

            // Filter activities for the past week
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

            const activitiesPastWeek = activities.filter(activity => {
                const activityDate = new Date(activity.start_time); // Replace 'activity_date' with your actual date field name
                return activityDate >= oneWeekAgo;
            });

              // Calculate the total distance for the past week
        weeklyDistance = activitiesPastWeek.reduce((total, activity) => {
            return total + (activity.distance || 0); // Assuming 'distance' is a numeric field
        }, 0);

        // Calculate the total calories burned for the past week
        weeklyCaloriesBurned = activitiesPastWeek.reduce((total, activity) => {
                return total + (activity.calories_burned || 0); // Assuming 'calories_burned' is a numeric field
            }, 0);

         // Calculate the total elapsed time for the past week in hours
         weeklyElapsedTime = activitiesPastWeek.reduce((total, activity) => {
            return total + (activity.elapsedTime ? convertToHours(activity.elapsedTime) : 0);
        }, 0);
        // Format weeklyElapsedTime to show hours and minutes
        const hours = Math.floor(weeklyElapsedTime);
        const minutes = Math.round((weeklyElapsedTime - hours) * 60);

        console.log(`Weekly Distance: ${weeklyDistance} units`); // Replace 'units' with the actual unit of distance
    })
    .catch((error) => {
        console.error('Error fetching activities:', error);
    });
	}

	onMount(() => {
		loadActivities(); // Call the load function inside onMount
	});

</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Spartan:wght@400;500;600;700&display=swap');      
    * {
        font-family: 'Montserrat', sans-serif;
    }

	.aspect-ratio-1 {
  		aspect-ratio: 1 / 1;
	}
</style>

<body>
    <div class="min-h-screen bg-[#F6F7FB]">
		<TopMenu menuLabel="Home" isHome={true} />
        <!-- Frame for all components, setting the width to 90% of the viewport -->
        <div style="padding-top: 146.6px;"></div>
        <div class="w-full mx-auto" style="width: 90%;">
            <DayMeter />
            <BigOrangeButton isHome={true} buttonText="Welcome" subText="Let's start an activity?" iconUrl="/Running-icon-white.png" />


            <h3 style="margin-top: 16px; background: linear-gradient(180deg, #F65800 0%, #F00 100%);
           -webkit-background-clip: text;
           color: transparent;
           background-clip: text;">Shortcuts: </h3>

            <!-- Grid container for the boxes -->
            <div class="grid grid-cols-2 grid-rows-2 gap-4" style="padding-top: 16px;">
                <!-- Four empty white boxes -->
                <div class="aspect-ratio-1 bg-white rounded-lg p-4 text-center flex flex-col justify-center items-center" style="background:linear-gradient(180deg, #F65800 0%, #F00 100%); box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);">
                    <a href="/app/friends"><img src="/Friends-icon.png" alt="Friends" style="height: 50px; width: 50px"></a>
                </div>
                <div class="aspect-ratio-1 bg-white rounded-lg p-4 flex flex-col justify-around items-left shadow-custom" style="max-width: 200px; max-height: 200px; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);">
                    <h1 class="font-bold text-xl mb-1" style="background: linear-gradient(180deg, #F65800 0%, #F00 100%);
                    -webkit-background-clip: text;
                    color: transparent;
                    background-clip: text;">Past week:</h1>
                
                    <div class="flex items-center space-x-3">
                        <img src="/stepshome.png" alt="Foot" class="h-6 w-6"/> <!-- Foot logo for steps -->
                        <p class="text-xl">{(weeklyDistance * 1.31).toFixed(0)}</p>
                    </div>
                
                    <div class="flex items-center space-x-3 mt-1">
                        <img src="/calorieshome.png" alt="Flame" class="h-6 w-6"/> <!-- Flame logo for calories -->
                        <p class="text-xl">{weeklyCaloriesBurned}</p>
                    </div>
                
                    <div class="flex items-center space-x-3 mt-1">
                        <img src="/clockhome.png" alt="Clock" class="h-6 w-6"/> <!-- Clock logo for total time -->
                        <p class="text-xl">{weeklyElapsedTime.toFixed(2)}</p>
                    </div>
                </div>
                     
                <div class="bg-white rounded-lg aspect-ratio-1" style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);"></div>
                <div class="aspect-ratio-1 bg-white rounded-lg p-4 text-center flex flex-col justify-center items-center" style="background:linear-gradient(180deg, #F65800 0%, #F00 100%); box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);">
                    <a href="/app/map"><img src="/Map-icon.png" alt="Map" style="height: 50px; width: 50px"></a>
                </div>            
            </div>
        </div>
    </div>
</body>
