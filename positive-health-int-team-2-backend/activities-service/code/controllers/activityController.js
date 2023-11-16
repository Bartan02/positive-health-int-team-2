import haversine from 'haversine-distance';


let activities = { } // this should be from database

function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
}

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


export const updateLocation = (req, res) => {
    const { activityId, currentLocation } = req.body;

    if (!activities[activityId]) {
        return res.status(404).send('Activity not found');
    }

    const startLocation = activities[activityId].startLocation;
    const distance = haversine(startLocation, currentLocation); // Calculates distance in meters

    activities[activityId].distance += distance;
    activities[activityId].lastLocation = currentLocation;

    res.json({ distance: activities[activityId].distance, message: 'Location updated successfully' });
};


export const stopActivity = (req, res) => {
    const { activityId } = req.body;

    if (!activities[activityId]) {
        return res.status(404).send('Activity not found');
    }

    const activity = activities[activityId];
    const endTime = new Date();
    const totalTime = (endTime - activity.startTime) / 1000; // Total time in seconds

    const result = {
        distance: activity.distance,
        totalTime,
        message: 'Activity stopped successfully'
    };

    delete activities[activityId]; // Remove the activity from storage

    res.json(result);
};
