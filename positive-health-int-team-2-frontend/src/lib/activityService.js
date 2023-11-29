// Function to start an activity
export async function startActivity(userId, startLocation) {
    const response = await fetch('http://localhost:3015/activity/start/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, startLocation })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

// Function to stop an activity
export async function stopActivity(activityId, maximumSpeed) {
    console.log('Sending to backend:', { activityId, maximumSpeed });
    const response = await fetch('http://localhost:3015/activity/stop/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            activityId,
            maximumSpeed: maximumSpeed
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
    const response = await fetch('http://localhost:3015/activity/update-location', {
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