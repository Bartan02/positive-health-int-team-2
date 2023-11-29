
export async function getAllInfo() {
    const response = await fetch('http://localhost:3019/map/get-all-info/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

/**
 * @param {any} meetingStartTime
 * @param {any} meetingEndTime
 * @param {any} latitude
 * @param {any} longtitude
 * @param {any} skillLevel
 * @param {any} activity
 */
export async function createMeeting(activity, meetingStartTime, meetingEndTime, latitude, longtitude, skillLevel) {
    const response = await fetch('http://localhost:3019/map/create-meeting/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            activity: activity,
            meetingStartTime: meetingStartTime,
            meetingEndTime: meetingEndTime,
            latitude: latitude,
            longtitude: longtitude,
            skillLevel: skillLevel
        })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}