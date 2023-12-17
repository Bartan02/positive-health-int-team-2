<script>
    import { onMount } from 'svelte';
    let activities = [];

    onMount(async () => {
        try {
            const response = await fetch('http://localhost:3015/activities/records');
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            activities = data[0]; // Assuming the first element is the relevant data
        } catch (error) {
            console.error('Failed to fetch activities:', error);
        }
    });
</script>


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
                <td>Lat: {activity.start_location.latitude}, Lon: {activity.start_location.longitude}</td>
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

<h1>Distance</h1>
