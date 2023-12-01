<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import { writable, get } from 'svelte/store';
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
    let maximumSpeed = 0; // maximumSpeed;
    let sprintDistance = 0;
    let currentSpeed = 0;
    let previousLocation = null;


    function calculateSpeed(currentLocation) {
    if (previousLocation) {
        const timeDifference = Date.now() - lastUpdateTime; // time in milliseconds
        const distance = haversine(previousLocation, currentLocation); // distance in meters

        // Speed in meters per second
        currentSpeed = distance / (timeDifference / 1000); 

        // Optionally, convert to km/h or mph as needed
        currentSpeed = currentSpeed * 3.6; // for km/h
    }

    previousLocation = currentLocation; // update previousLocation for the next calculation
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
            const response = await stopActivity(activityId, maximumSpeed);
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
        
        if (elapsedHours > 0) {
             // Average speed in meters/hour
            const avgSpeed = get(distance) / elapsedHours;
            averageSpeed.set(avgSpeed);
            if (maximumSpeed < avgSpeed) {
                maximumSpeed = avgSpeed;
            }
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
        clearInterval(intervalId); // Clear the interval timer when the component is destroyed
    });
</script>

<div class="flex flex-row justify-center">
    <div class="outer-circle flex justify-center items-center">
        <div class="absolute tick right"></div>
        <div class="absolute tick left"></div>
        <div class="absolute tick top"></div>
        <div class="absolute tick bottom"></div>

        <div class="inner-1 flex justify-center items-center">
            <div class="inner-2 flex justify-center items-center">
                <div class="inner-3 flex justify-center items-center">
                    <div class="inner-4 flex justify-center items-center">
                        <div class="w-2 h-2 bg-white rounded-full flex justify-center items-center">
                            <div class="absolute needle"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="flex flex-row justify-center py-6" style="z-index: 0">
    <span class="app-font-big font-bold text-black">{$elapsedTime}</span>
</div>

<div class="flex flex-col justify-between">
    <!-- UI for displaying distance and average speed -->
    <a href="#" class="mb-4 max-w-sm p-6 bg-orange-200 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Distance:</h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">{$distance} meters</p>
    </a>

    <a href="#" class="mb-4 max-w-sm p-6 bg-orange-200 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Average Speed:</h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">{$averageSpeed.toFixed(2)} meters/hour</p>
    </a>

    <a href="#" class="mb-4 max-w-sm p-6 bg-orange-200 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Maximum avg Speed:</h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">{maximumSpeed.toFixed(2)} meters/hour</p>
    </a>

    <a href="#" class="mb-4 max-w-sm p-6 bg-orange-200 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Current Speed</h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">{currentSpeed.toFixed(2)} km/h</p>
    </a>

    <!-- UI for controlling the activity -->
    <div class="text-center mt-2">
        <button class="inline-flex items-center justify-center px-5 py-3 text-2xl font-bold text-center  text-white border border-orange-500 rounded-lg shadow-sm cursor-pointer hover:text-white bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600"
            on:click={isActivityOngoing ? handleStopActivity : handleStartActivity}><svg class="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            {isActivityOngoing ? 'Stop Activity' : 'Start Activity'}
        </button>
    </div>
    
<style>
    @import url('https://fonts.googleapis.com/css2?family=Spartan:wght@400;500;600;700&display=swap');

body {
    font-family: 'Spartan', sans-serif;
}

div.container {
    width: 300px;
    background: linear-gradient(to bottom, #353378 50%,#242c44 100%);
    height: 430px;
}

div.outer-circle {
    width: 150px;
    height: 150px;
    background: linear-gradient(to bottom, #302d67, #2c2d5c);
    border-radius: 50%;
}

div.tick {
    width: 10px;
    height: 2px;
    background: white;
    border-radius: 2px;
}

div.right {
    transform: rotate(0deg) translateX(72px);
}

div.left {
    transform: rotate(180deg) translateX(72px);
}

div.top {
    transform: rotate(270deg) translateX(72px);
}

div.bottom {
    transform: rotate(90deg) translateX(72px);
}

div.inner-1 {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: conic-gradient(from -45deg at center, transparent, rgb(255,255,255,0.3));
}

div.inner-2 {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: conic-gradient(from -45deg at center, transparent, rgb(255,255,255,0.5));
}

div.inner-3 {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: conic-gradient(from -45deg at center, transparent, rgb(255,255,255,0.2));
}

div.inner-4 {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(to bottom, #302d65, #2d2d62);
}

div.needle {
    width: 150px;
    height: 2px;
    background: white;
    transform: rotate(225deg) translateX(30px);
    border-radius: 5px;
}

div.slant-1 {
    height: 350px;
    width: 350px;
    background: linear-gradient(to bottom, #ff4647 25%, #b53c85 100%);
    transform: rotate(45deg);
    position: absolute;
    right: -90px;
    bottom: -150px;
    opacity: 0.5;
}

div.slant-2 {
    height: 420px;
    width: 360px;
    background: linear-gradient(to bottom, #ff4647 25%, #b53c85 100%);
    transform: rotate(45deg);
    position: absolute;
    right: -130px;
    bottom: -200px;
    
}

.app-font-small {
    font-size: 12px;
}

.app-bg-yellow {
    background: #F1FE3D;
}

.app-shadow {
    box-shadow: 0 25px 30px 0px rgb(0, 0, 0,0.75);
}

.app-font-big {
    font-size: 36px;
}

.app-color-blue {
    color: #2A2C52;
}
</style>

</div>
