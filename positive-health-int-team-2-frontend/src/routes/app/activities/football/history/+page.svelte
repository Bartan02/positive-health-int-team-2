<script>
	import TopMenu from '../../../../../components/top-menu.svelte';
	import { onMount } from 'svelte';

	let userId;
	let activities = [];

	async function fetchAllRecords(userId) {
		const url = `http://localhost:3015/activities/records?userId=${encodeURIComponent(userId)}`;

		try {
			const response = await fetch(url); // GET request

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			return data[0].filter(activity => activity.activity_name === 'Football');
		} catch (error) {
			console.error('Error fetching last record:', error);
		}
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
            // Use the filtered records here
            activities = records;
            console.log(activities);
        })
        .catch((error) => {
            console.error('Error fetching activities:', error);
        });
	}

	onMount(() => {
		loadActivities(); // Call the load function inside onMount
	});
</script>

<body>
    <div class="min-h-screen bg-[#F6F7FB]">
        <TopMenu menuLabel="History"/>
        <div class="w-full mx-auto" style="width: 90%;">
            <div style="padding-top: 81px; max-width: md; margin-left: auto; margin-right: auto;">
                {#each activities as activity}
                    <div class="flex flex-col justify-between bg-white rounded-lg p-4 mb-2 w-full max-w-md mx-auto" style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);">
                        <div>{activity.activity_name}</div>
                        <div><strong>Start time:</strong> {activity.start_time.slice(0, -14)}, {activity.start_time.slice(11, 16)}</div>
                        <div><strong>Distance: </strong>{activity.distance}</div>
                        <div><strong>Top speed: </strong>{activity.maximum_speed || 'N/A'}</div>
                        <div><strong>Sprint distance: </strong>{activity.sprintDistance}</div>
                        <div><strong>Total time: </strong>{activity.elapsedTime}</div>
                        <div><strong>Calories burnt: </strong>{activity.calories_burned}</div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</body>