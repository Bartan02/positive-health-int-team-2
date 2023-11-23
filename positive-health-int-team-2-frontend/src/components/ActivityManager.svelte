<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import { writable } from 'svelte/store';
    import { startActivity, stopActivity, updateLocation } from '../lib/activityService.js';

    export let userId;
    let activityId = null;
    let isActivityOngoing = false;
    let distance = writable(0);
    const dispatcher = createEventDispatcher();

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
            dispatcher('activityStopped', response.distance / 10);
            
        } catch (error) {
            console.error('Error stopping activity:', error);
        }
    }

    let watchId;
    onMount(() => {
        if ('geolocation' in navigator) {
            watchId = navigator.geolocation.watchPosition(
                async (position) => {
                    if (activityId) {
                        const currentLocation = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        };

                        console.log(`Latitude: ${currentLocation.latitude}, Longitude: ${currentLocation.longitude}`);
                        
                        try {
                            const response = await updateLocation(activityId, currentLocation);
                            distance.set(response.distance); // Update distance state
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
                    timeout: 10000, // Adjusted timeout for better reliability
                    maximumAge: 0
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    });
    onDestroy(() => {
        if (watchId) {
            navigator.geolocation.clearWatch(watchId);
        }
    });
</script>

<button on:click={isActivityOngoing ? handleStopActivity : handleStartActivity}>
    {isActivityOngoing ? 'Stop Activity' : 'Start Activity'}
</button>

<h2>Distance: {$distance} meters</h2>