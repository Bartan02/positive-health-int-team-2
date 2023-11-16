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

export async function stopActivity(activityId) {
    const response = await fetch('http://localhost:3015/activity/stop/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ activityId})
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

export async function updateLocation(activityId, currentLocation) {
    const response = await fetch('http://localhost:3015/activity/update-location', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ activityId, currentLocation })
    });

    if (!response.ok) {
        throw new Error(`HTTP error for location! status: ${response.status}`);
    }

    return response.json();
}