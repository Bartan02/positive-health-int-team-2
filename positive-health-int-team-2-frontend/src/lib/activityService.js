// Function to start an activity
// https://step-up-api-gateway-2639a76e4388.herokuapp.com   a link to hosted back end
export async function startActivity(userId, startLocation, activityName) {
    const response = await fetch('https://step-up-api-gateway-2639a76e4388.herokuapp.com/activities/start/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, startLocation, activityName })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

// Function to stop an activity
export async function stopActivity(activityId, maximumSpeed, distanceValue, sprintDistance, elapsedTimeValue, averageSpeedValue) {
    const response = await fetch('https://step-up-api-gateway-2639a76e4388.herokuapp.com/activities/stop/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            activityId,
            maximumSpeed: maximumSpeed,
            distanceValue,
            sprintDistance,
            elapsedTimeValue,
            averageSpeedValue
        })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

// Function to update an activity's location
export async function updateLocation(activityId, currentLocation, maximumSpeed) {
    const maximumSpeedInt = parseInt(maximumSpeed, 10);
    const response = await fetch('https://step-up-api-gateway-2639a76e4388.herokuapp.com/activities/update-location/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ activityId, currentLocation, maximumSpeed: maximumSpeedInt })
    });

    if (!response.ok) {
        throw new Error(`HTTP error for location! status: ${response.status}`);
    }

    return response.json();
}