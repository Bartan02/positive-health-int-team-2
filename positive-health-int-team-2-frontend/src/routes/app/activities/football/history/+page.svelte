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
			return data;
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
				// Use the records here
				activities = records[0]; // If records is an array
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

<table>
	<thead>
		<tr>
			<th>Activity ID</th>
			<th>User ID</th>
			<th>Start Time</th>
			<th>Start Location</th>
			<th>Distance</th>
			<th>Last Location</th>
			<th>Maximum Speed</th>
		</tr>
	</thead>
	<tbody>
		{#each activities as activity}
			<tr>
				<td>{activity.activity_id}</td>
				<td>{activity.user_id}</td>
				<td>{activity.start_time}</td>
				<td>{activity.distance}</td>
				<td>
					{#if activity.last_location}
						Lat: {activity.last_location.latitude}, Lon: {activity.last_location.longitude}
					{:else}
						N/A
					{/if}
				</td>
				<td>{activity.maximum_speed || 'N/A'}</td>
			</tr>
		{/each}
	</tbody>
</table>
