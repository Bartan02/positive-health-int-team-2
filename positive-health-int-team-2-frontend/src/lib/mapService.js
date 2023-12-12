export async function getAllMeetings() {
    const response = await fetch('http://localhost:3019/map/get-all-meetings/', {
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
 * @param {any} longitude
 * @param {any} skillLevel
 * @param {any} activity
 */
export async function createMeeting(activity, meetingStartTime, meetingEndTime, latitude, longitude, skillLevel) {
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
            longitude: longitude,
            skillLevel: skillLevel
        })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}