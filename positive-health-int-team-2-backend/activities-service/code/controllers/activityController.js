// Purpose: Handles the core business logic for managing activities.
// Key Functions:
// startActivity: Initializes an activity with a unique ID, start time, and location.
// updateLocation: Updates the current location of an ongoing activity and calculates the distance traveled using the haversine formula.
// stopActivity: Terminates an ongoing activity, calculating the total time and distance.
// Data Handling: Currently uses an in-memory object (activities) for data storage. For production, you should consider integrating a database for persistent storage.
// Dependencies: Relies on the haversine-distance package for calculating distances.

// Connection and Flow
// Activity Start:

// User initiates an activity on the frontend.
// startActivity in activityService.js sends a request to the backend's /start route.
// Backend initializes the activity and returns an activity ID.
// Location Update:

// The frontend continuously tracks the user's location.
// updateLocation sends the current location to the backend's /update-location route.
// Backend calculates and updates the distance traveled.
// Activity Stop:

// User stops the activity on the frontend.
// stopActivity communicates with the backend's /stop route.
// Backend finalizes the activity data and sends a response back.

import haversine from 'haversine-distance';

let activities = { } // In-memory storage, replace with DB for production

// Generates a unique ID for each activity
function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
}

// Starts a new activity and returns its ID
export const startActivity = (req, res) => {
    const userId = req.body.userId;
    const startLocation = req.body.startLocation;

    if (!userId || !startLocation) {
        return res.status(400).send('Missing user Data');
    }

    const activityId = generateUniqueId();
    activities[activityId] = {
        userId,
        startTime: new Date(),
        startLocation,
        distance: 0,
    };

    res.json({activityId, message:'Activity succesfully started'});
}

// Updates the location of an ongoing activity
export const updateLocation = (req, res) => {
    const { activityId, currentLocation } = req.body;

    if (!activities[activityId]) {
        return res.status(404).send('Activity not found');
    }

    const startLocation = activities[activityId].startLocation;
    const distance = haversine(startLocation, currentLocation);

    activities[activityId].distance += distance;
    activities[activityId].lastLocation = currentLocation;

    res.json({ distance: activities[activityId].distance, message: 'Location updated successfully' });
};

// Stops an ongoing activity and returns its summary
export const stopActivity = (req, res) => {
    const { activityId } = req.body;

    if (!activities[activityId]) {
        return res.status(404).send('Activity not found');
    }

    const activity = activities[activityId];
    const endTime = new Date();
    const totalTime = (endTime - activity.startTime) / 1000;

    const result = {
        distance: activity.distance,
        totalTime,
        message: 'Activity stopped successfully'
    };

    res.json(result);
};