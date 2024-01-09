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
import db from '../db.js';

let activities = { } // In-memory storage, replace with DB for production

// Generates a unique ID for each activity
function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
}

// Starts a new activity and returns its ID
export const startActivity = async (req, res) => {
    const userId = req.body.userId;
    const startLocation = req.body.startLocation;

    if (!userId || !startLocation) {
        return res.status(400).send('Missing user Data');
    }

    const activityId = generateUniqueId();
    try {
        const [rows, fields] = await db.execute(
            'INSERT INTO activities (activity_id, user_id, start_time, start_location, distance) VALUES (?, ?, NOW(), ?, 0)',
            [activityId, userId, JSON.stringify(startLocation)]
        );
        res.json({ activityId, message: 'Activity successfully started' });
    } catch (error) {
        console.error('Error in startActivity:', error);
        res.status(500).send('Database error');
    }
};



// Stops an ongoing activity and returns its summary
export async function stopActivity(req, res) {
    // const { activityId, maximumSpeed } = req.body;
    const activityId = req.body.activityId;
    const maximumSpeed = req.body.maximumSpeed;
    console.log('Received in backend:', req.body);
    try {
        // Retrieve the activity data from the database
        const [activityRows] = await db.query(
            'SELECT start_time, distance FROM activities WHERE activity_id = ?',
            [activityId]
        );
        

        if (activityRows.length === 0) {
            return res.status(404).send('Activity not found');
        }
        
        // Update maximum speed only if the activity exists
        const updateQuery = 'UPDATE activities SET maximum_speed = ? WHERE activity_id = ?';
        await db.query(updateQuery, [maximumSpeed, activityId]);

        const activity = activityRows[0];
        const endTime = new Date();
        const totalTime = (endTime - new Date(activity.start_time)) / 1000;

        const result = {
            distance: activity.distance,
            totalTime,
            maximumSpeed,
            message: 'Activity stopped successfully',
        };
        console.log(result);
        res.json(result);
    } catch (error) {
        console.error('Error in stopActivity:', error); // Log the error for debugging
        res.status(500).send('Database error');
    }
};

// Updates the location of an ongoing activity
export async function updateLocation(req, res) {
    const { activityId, currentLocation, maximumSpeed } = req.body;

    try {
        // Retrieve the last location and current total distance from the database
        const [activityRows] = await db.query(
            'SELECT last_location, distance FROM activities WHERE activity_id = ?',
            [activityId]
        );

        if (activityRows.length === 0) {
            return res.status(404).send('Activity not found');
        }

        let lastLocation = activityRows[0].last_location;
        let totalDistance = activityRows[0].distance;

        if (typeof lastLocation === 'string') {
            lastLocation = JSON.parse(lastLocation);
        }

        if (lastLocation) {
            // Calculate distance between the last and current locations
            const incrementalDistance = haversine(lastLocation, currentLocation);
            totalDistance += incrementalDistance;
        }
        console.log('Received request body: ', req.body);
        // Update the total distance and last location in the database
        await db.query(
            'UPDATE activities SET distance = ?, last_location = ?, maximum_speed = ? WHERE activity_id = ?',
            [totalDistance, JSON.stringify(currentLocation), maximumSpeed, activityId]
        );
        

        res.json({ distance: totalDistance, message: 'Location updated successfully', maximumSpeed });
    } catch (error) {
        console.error('Error in updating activity:', error);
        res.status(500).send('Database error');
    }
};


// retrieves all the records from activities table
export async function getAllData(req, res) {
    try { 
        const result = await db.query (
          'SELECT * from activities'
        )
        res.json(result);
        } catch (error) {
          console.error('Error fetching data from the database:', error);
          res.status(500).send('Server error occurred');
        }
}

//Retrieves last activity record by the user id 
export async function getLastRecord(req, res) { 
    const userId = req.body.userId;

    // Validate userId
    if (!userId) {
        return res.status(400).send('User ID is required');
    }

    try {
        const result = await db.query(
            'SELECT * FROM activities WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1', [userId]
        );
        res.json(result);
    } catch(error) {
        console.error('Error fetching data from the database:', error);
        res.status(500).send('Server error occurred');
    }
}