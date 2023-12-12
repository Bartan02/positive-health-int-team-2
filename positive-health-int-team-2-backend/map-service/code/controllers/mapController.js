import db from '../db.js';

export async function testTheFunctionality(req, res) { 
    res.status(200).send('Everything is super');
}

export async function getAllMeetings(req, res) {
    try {
        console.log('Fetching all meetings')
        // Perform the SQL query to retrieve all meetings
        const [rows] = await db.query('SELECT * FROM Meetings');

        console.log('Fetched all meetings:', rows);
        res.json({ meetings: rows });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

export async function createMeeting(req, res) {
    try {
        const activity = req.body.activity;

        const meetingStartTime = new Date();
        const meetingHour = parseInt(req.body.meetingStartTime);
        meetingStartTime.setHours(meetingHour, 0, 0, 0);

        const meetingEndTime = new Date();
        const meetingEndHour = parseInt(req.body.meetingEndTime);
        meetingEndTime.setHours(meetingEndHour, 0, 0, 0);

        const locationLatitude = req.body.latitude;
        const locationLongitude = req.body.longitude;

        console.log('Latitude:', locationLatitude);
        console.log('Longitude:', locationLongitude);
        const skillLevel = req.body.skillLevel

        // Perform the SQL query to insert a new entry
        const newMeeting = { activity, meetingStartTime, meetingEndTime, locationLatitude, locationLongitude, skillLevel };
        const [result] = await db.query('INSERT INTO Meetings SET ?', newMeeting);

        console.log('New meeting created:', result.insertId);
        res.json({ message: 'New meeting created', meetingId: result.insertId });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}