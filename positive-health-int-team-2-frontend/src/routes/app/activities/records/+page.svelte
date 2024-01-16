<script>
    import { onMount } from 'svelte';
    import TopMenu from '../../../../components/top-menu.svelte';
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

<body>
    <div class="min-h-screen" style="background: F6F7FB;">
		<TopMenu menuLabel="Records" />
        <!-- Frame for all components, setting the width to 90% of the viewport -->
        <div style="padding-top: 146.6px;">
        <div class="w-full mx-auto" style="width: 90%;">
            <div class="overflow-x-auto">
                <table class="w-full text-left table-auto">
                    <thead class="text-sm text-gray-700 bg-gray-200">
                        <tr>
                            <th class="px-4 py-2">Activity ID</th>
                            <th class="px-4 py-2">User ID</th>
                            <th class="px-4 py-2">Start Time</th>
                            <th class="px-4 py-2">Start Location</th>
                            <th class="px-4 py-2">Distance</th>
                            <th class="px-4 py-2">Last Location</th>
                            <th class="px-4 py-2">Maximum Speed</th>
                        </tr>
                    </thead>
                    <tbody class="text-xs sm:text-sm bg-white">
                        {#each activities as activity}
                            <tr class="border-b">
                                <td class="px-4 py-2">{activity.activity_id}</td>
                                <td class="px-4 py-2">{activity.user_id}</td>
                                <td class="px-4 py-2">{activity.start_time}</td>
                                <td class="px-4 py-2">Lat: {activity.start_location.latitude}, Lon: {activity.start_location.longitude}</td>
                                <td class="px-4 py-2">{activity.distance}</td>
                                <td class="px-4 py-2">
                                    {#if activity.last_location}
                                        Lat: {activity.last_location.latitude}, Lon: {activity.last_location.longitude}
                                    {:else}
                                        N/A
                                    {/if}
                                </td>
                                <td class="px-4 py-2">{activity.maximum_speed || 'N/A'}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
</div>
</div>
</body>