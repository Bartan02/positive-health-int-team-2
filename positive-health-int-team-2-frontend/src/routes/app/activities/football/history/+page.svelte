<script>
	import SideMenu from '../../../../../components/top-menu.svelte';
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
			// Handle the error accordingly
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

<SideMenu />

<table style="margin-top:5%">
	<thead>
		<tr>
			<th>Activity name</th>
			<th>Activity ID</th>
			<th>Start Time</th>
			<th>Start Location</th>
			<th>Last Location</th>
			<th>Distance</th>
			<th>Maximum Speed</th>
			<th>Sprint Distance</th>
			<th>Total time</th>
			<th>Calories Burned</th>
		</tr>
	</thead>
	<tbody>
		{#each activities as activity}
			<tr>
				<td>{activity.activity_name}</td>
				<td>{activity.activity_id}</td>
				<td>{activity.start_time}</td>
				<td>{activity.start_location}</td>
				<td>
					{#if activity.last_location}
						Lat: {activity.last_location.latitude}, Lon: {activity.last_location.longitude}
					{:else}
						N/A
					{/if}
				</td>
				<td>{activity.distance}</td>
				<td>{activity.maximum_speed || 'N/A'}</td>
				<td>{activity.sprintDistance}</td>
				<td>{activity.elapsedTime}</td>
				<td>{activity.calories_burned}</td>
			</tr>
		{/each}
	</tbody>
</table>
