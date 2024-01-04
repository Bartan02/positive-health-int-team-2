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
 * @param {any} makerUserID
 */
export async function createMeeting(activity, meetingStartTime, meetingEndTime, latitude, longitude, skillLevel, makerUserID) {
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
    const response = await fetch('http://localhost:3019/map/join-meeting/', {
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
    const response = await fetch(`http://localhost:3019/map/delete-meeting/${meetingID}`, {
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
* @param {any} userID
*/
export async function getUserData(userID) {
    const response = await fetch(`http://localhost:3025/auth/user/${userID}`, {
        method: 'GET',
        headers: {  
            'Content-Type': 'application/json'
        },
    });
    console.log('got to getUserData')

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

/**
 * @param {any} activityID
 */
export async function getMeetingPlayers(activityID) {
    const response = await fetch(`http://localhost:3019/map/get-meeting-players/${activityID}`, {
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
    const response = await fetch('http://localhost:3019/map/leave-meeting/', {
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
