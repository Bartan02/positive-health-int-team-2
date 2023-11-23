<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import { writable } from 'svelte/store';
    import { startActivity, stopActivity, updateLocation } from '../lib/activityService.js';

    export let userId;
    let activityId = null;
    let isActivityOngoing = false;
    const distance = writable(0); // Total distance
    const startTime = writable(null); // Start time of the activity
    const averageSpeed = writable(0); // Average speed
    const elapsedTime = writable('00:00:00'); // Store to keep track of elapsed time
    const dispatcher = createEventDispatcher();
    let localStartTime; // Local variable to hold start time

    function getCurrentLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject('Geolocation is not supported by your browser');
            } else {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            }
        });
    }

    async function handleStartActivity() {
        try {
            const position = await getCurrentLocation();
            const startLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };

            const response = await startActivity(userId, startLocation);
            activityId = response.activityId;
            isActivityOngoing = true;
            dispatcher('activityStarted', { activityId });

            startTime.set(new Date()); // Set the start time
            localStartTime = new Date(); // Update local start time for calculations

            console.log(response, startLocation);
        } catch (error) {
            console.error('Error in handleStartActivity:', error);
        }
    }

    async function handleStopActivity() {
        try {
            const response = await stopActivity(activityId);
            isActivityOngoing = false;
            activityId = null;
            dispatcher('activityStopped', response);
            clearInterval(intervalId); // Clear the interval to stop updating elapsed time
            elapsedTime.set('00:00:00'); // Optionally reset elapsed time
            startTime.set(null);
            localStartTime = null;

        } catch (error) {
            console.error('Error stopping activity:', error);
        }
    }

    let watchId;
    let intervalId; // ID for the interval timer
    onMount(() => {
        if ('geolocation' in navigator) {
            watchId = navigator.geolocation.watchPosition(
                async (position) => {
                    if (activityId) {
                        const currentLocation = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        };

                        try {
                            const response = await updateLocation(activityId, currentLocation);
                            distance.set(response.distance);

                            if (localStartTime) {
                                const now = new Date();
                                const elapsed = new Date(now - localStartTime);

                                const hours = elapsed.getUTCHours().toString().padStart(2, '0');
                                const minutes = elapsed.getUTCMinutes().toString().padStart(2, '0');
                                const seconds = elapsed.getUTCSeconds().toString().padStart(2, '0');

                                elapsedTime.set(`${hours}:${minutes}:${seconds}`);
                            }
                        } catch (error) {
                            console.error('Error updating location:', error);
                        }
                    }
                },
                (error) => {
                    console.error('Error getting location:', error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );

            // Setup interval to update elapsed time every second
            intervalId = setInterval(() => {
                if (localStartTime) {
                    const now = new Date();
                    const elapsed = new Date(now - localStartTime);

                    const hours = elapsed.getUTCHours().toString().padStart(2, '0');
                    const minutes = elapsed.getUTCMinutes().toString().padStart(2, '0');
                    const seconds = elapsed.getUTCSeconds().toString().padStart(2, '0');

                    elapsedTime.set(`${hours}:${minutes}:${seconds}`);
                }
            }, 1000);
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    });

    onDestroy(() => {
        if (watchId) {
            navigator.geolocation.clearWatch(watchId);
        }
        clearInterval(intervalId); // Clear the interval timer when the component is destroyed
    });
</script>

<!-- UI for displaying distance and average speed -->
<h2>Distance: {$distance} meters</h2>
<h2>Average Speed: {$averageSpeed.toFixed(2)} meters/hour</h2>
<h2>Elapsed Time: {$elapsedTime}</h2>

<!-- UI for controlling the activity -->
<button on:click={isActivityOngoing ? handleStopActivity : handleStartActivity}>
    {isActivityOngoing ? 'Stop Activity' : 'Start Activity'}
</button>


