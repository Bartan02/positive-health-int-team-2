export async function getAllMeetings() {
    const response = await fetch('https://step-up-api-gateway-2639a76e4388.herokuapp.com/map/get-all-meetings/', {
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
 * @param {any} makerUserID
 */
export async function createMeeting(activity, meetingStartTime, meetingEndTime, latitude, longitude, skillLevel, makerUserID) {
    const response = await fetch('https://step-up-api-gateway-2639a76e4388.herokuapp.com/map/create-meeting/', {
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
            skillLevel: skillLevel,
            makerUserID: makerUserID
        })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

/**
 * @param {any} meetingID
 * @param {any} playerID
 */
export async function joinMeeting(meetingID, playerID) {
    const response = await fetch('https://step-up-api-gateway-2639a76e4388.herokuapp.com/map/join-meeting/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            meetingID: meetingID,
            playerID: playerID
        })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

/**
 * @param {any} meetingID
 */
export async function deleteMeetingFromDB(meetingID) {
    const response = await fetch(`https://step-up-api-gateway-2639a76e4388.herokuapp.com/map/delete-meeting/${meetingID}`, {
        method: 'DELETE',
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
 * @param {any} activityID
 */
export async function getMeetingPlayers(activityID) {
    const response = await fetch(`https://step-up-api-gateway-2639a76e4388.herokuapp.com/map/get-meeting-players/${activityID}`, {
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

export async function leaveMeeting(meetingID, playerID) {
    const response = await fetch('https://step-up-api-gateway-2639a76e4388.herokuapp.com/map/leave-meeting/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            meetingID: meetingID,
            playerID: playerID
        })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}
