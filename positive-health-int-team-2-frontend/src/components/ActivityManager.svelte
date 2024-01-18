<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import { writable, get } from 'svelte/store';
    import { startActivity, stopActivity, updateLocation } from '../lib/activityService.js';
    import haversine from 'haversine-distance'; 

    export let userId;
    export let activityName;
    let activityId = null;
    let isActivityOngoing = false;
    const distance = writable(0); // Total distance
    const startTime = writable(null); // Start time of the activity
    const averageSpeed = writable(0); // Average speed
    const elapsedTime = writable('00:00:00'); // Store to keep track of elapsed time
    const dispatcher = createEventDispatcher();
    let localStartTime; // Local variable to hold start time
    let maximumSpeed = 0; // maximumSpeed;
    let sprintDistance = 0;
    let currentSpeed = writable(0); // Initialize as a Svelte store
    let previousLocation = null;
    let speedUpdateIntervalId; 
    const SPEED_UPDATE_INTERVAL = 50; // Adjust this to control how often the speed updates (in milliseconds)
    const maxHumanSpeed = 28;
    const SPRINT_THRESHOLD_SPEED = 24 * 1000 / 3600; // 24 km/h in meters per second
    let totalDistance = 0; // Add this to keep track of the total distance


    function calculateSpeed(currentLocation) {
        if (previousLocation) {
            const timeDifference = Date.now() - lastUpdateTime;

            if (timeDifference > 0) {
                const distanceCovered = haversine(previousLocation, currentLocation);
                let speed = 0;

                if (distanceCovered > 0) {
                    speed = (distanceCovered / (timeDifference / 1000)) * 3.6;
                    totalDistance += distanceCovered; // Accumulate distance

                    if (speed > maxHumanSpeed) {
                        speed = 0;
                    } else if (speed >= SPRINT_THRESHOLD_SPEED) {
                        sprintDistance += distanceCovered;
                    }
                }

                currentSpeed.set(speed);
                distance.set(totalDistance); // Update the distance store
            } else {
                currentSpeed.set(0);
            }

            lastUpdateTime = Date.now();
            previousLocation = currentLocation;
        } else {
            previousLocation = currentLocation;
            lastUpdateTime = Date.now();
        }
    }

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

            const response = await startActivity(userId, startLocation, activityName);
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
            const distanceValue = get(distance); // get the actual value from the store
            const elapsedTimeValue = get(elapsedTime); // get the actual value from the store
            const averageSpeedValue = get(averageSpeed); // get the actual speed value from the store
            const response = await stopActivity(activityId, maximumSpeed, distanceValue, sprintDistance, elapsedTimeValue, averageSpeedValue);
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

    function updateAverageSpeed() {
    const elapsedParts = get(elapsedTime).split(':');
    const elapsedHours = parseInt(elapsedParts[0]) + parseInt(elapsedParts[1]) / 60 + parseInt(elapsedParts[2]) / 3600;

    // Ensure a minimum amount of time has elapsed (e.g., 1 minute) before calculating average speed
    const MIN_ELAPSED_TIME_IN_HOURS = 1 / 60; // 1 minute in hours
    if (elapsedHours > MIN_ELAPSED_TIME_IN_HOURS) {
        // Convert distance from meters to kilometers and calculate average speed in km/h
        const avgSpeedKmPerHour = (get(distance) / 1000) / elapsedHours;
        averageSpeed.set(avgSpeedKmPerHour);
    }
}

function updateCurrentSpeed() {
        if (isActivityOngoing) {
            getCurrentLocation().then(position => {
                const currentLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };

                calculateSpeed(currentLocation);

                const currentSpeedValue = get(currentSpeed);
                if (currentSpeedValue > maximumSpeed) {
                    maximumSpeed = currentSpeedValue;
                }
            }).catch(error => {
                console.error('Error getting current location for speed update:', error);
            });
        }
    }


    
    let watchId;
    let intervalId; // ID for the interval timer
    const THROTTLE_INTERVAL = 200; // Throttle interval in milliseconds (e.g., 5000ms = 5s)
    let lastUpdateTime = 0; // Variable to store the last update time
    onMount(() => {
        if ('geolocation' in navigator) {
            watchId = navigator.geolocation.watchPosition(
                async (position) => {
                    if (activityId) {
                        const now = Date.now();
                        if (now - lastUpdateTime > THROTTLE_INTERVAL) {
                            lastUpdateTime = now;

                            const currentLocation = {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude
                            };
                            
                            calculateSpeed(currentLocation);

                            try {
                                console.log("Sending maximumSpeed:", maximumSpeed);
                                const response = await updateLocation(activityId, currentLocation, maximumSpeed);
                                distance.set(response.distance);

                                if (localStartTime) {
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

            // Setup interval to update current speed
            speedUpdateIntervalId = setInterval(updateCurrentSpeed, SPEED_UPDATE_INTERVAL);

            // Setup interval to update elapsed time every second
            intervalId = setInterval(() => {
                if (localStartTime) {
                    const now = new Date();
                    const elapsed = new Date(now - localStartTime);

                    const hours = elapsed.getUTCHours().toString().padStart(2, '0');
                    const minutes = elapsed.getUTCMinutes().toString().padStart(2, '0');
                    const seconds = elapsed.getUTCSeconds().toString().padStart(2, '0');

                    elapsedTime.set(`${hours}:${minutes}:${seconds}`);

                    updateAverageSpeed();
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
        // Clear the speed update interval
        clearInterval(speedUpdateIntervalId);
        clearInterval(intervalId); // Clear the interval timer when the component is destroyed
    });
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

    <!--

    <div class="flex justify-center gap-4 mt-6">
        <button class="px-10 py-4 text-lg font-bold text-white rounded shadow-lg bg-gradient-to-br from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 focus:outline-none" on:click={handleStartActivity}>Start</button>
        <button class="px-10 py-4 text-lg font-bold text-white rounded shadow-lg bg-gradient-to-br from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 focus:outline-none" on:click={handleStopActivity}>STOP</button>
    </div> -->

    <h1 class="text-4xl font-bold text-center bg-clip-text text-transparent" style="margin-top: 81px; background-image: linear-gradient(180deg, #F65800 0%, #F00 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
        {$elapsedTime}
      </h1>
      
    
    <div class="grid grid-cols-2 grid-rows-2 gap-4" style="padding-top: 16px;">
        <!-- Four empty white boxes -->
        <div class="bg-white rounded-lg aspect-ratio-1" style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25); display: flex; align-items: center; justify-content: center; text-align: center; background: linear-gradient(180deg, #F65800 0%, #F00 100%); -webkit-background-clip: text; background-clip: text; color: transparent;">
            Current speed: <br> {$currentSpeed.toFixed(2)} km/h
        </div>
        <div class="bg-white rounded-lg aspect-ratio-1" style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25); display: flex; align-items: center; justify-content: center; text-align: center; background: linear-gradient(180deg, #F65800 0%, #F00 100%); -webkit-background-clip: text; background-clip: text; color: transparent;">
            Average speed: <br> {$averageSpeed.toFixed(2)} km/h
        </div>
        <div class="bg-white rounded-lg aspect-ratio-1" style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25); display: flex; align-items: center; justify-content: center; text-align: center; background: linear-gradient(180deg, #F65800 0%, #F00 100%); -webkit-background-clip: text; background-clip: text; color: transparent;">
            Distance: <br> {$distance.toFixed(2)} m
        </div>
        <div class="bg-white rounded-lg aspect-ratio-1" style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25); display: flex; align-items: center; justify-content: center; text-align: center; background: linear-gradient(180deg, #F65800 0%, #F00 100%); -webkit-background-clip: text; background-clip: text; color: transparent;">
            Sprint distance: <br> {sprintDistance.toFixed(2) } m
        </div>

        <div class="col-span-2 text-center mt-4">
            <button href="/app/activities" class="inline-block px-10 py-3 text-xl font-bold text-white rounded-full bg-gradient-to-br from-orange-500 to-red-600 shadow-lg hover:bg-orange-600 focus
            :outline-none focus:ring-2 focus:ring-orange-300" role="button" on:click={isActivityOngoing ? handleStopActivity : handleStartActivity} style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);">
            {isActivityOngoing ? 'Stop Activity' : 'Start Activity'}
        </button>
        </div>
    </div>
