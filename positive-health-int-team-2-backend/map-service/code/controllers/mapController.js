import { createConnection } from 'mysql2/promise';

export async function testTheFunctionality(req, res) { 
    res.status(200).send('Everything is super');
}

export async function getAllMeetings(req, res) {
    try {
        // MySQL database configuration
        const dbConfig = {
            host: 'positive-health-int-team-2-backend-map-db-1',
            user: 'activity123',
            password: 'activity123123',
            database: 'map-db',
        };

        const connection = await createConnection(dbConfig);
        console.log('Connected to MySQL database');

        // Perform the SQL query to retrieve all meetings
        const [rows] = await connection.query('SELECT * FROM Meetings');

        console.log('Fetched all meetings:', rows);
        res.json({ meetings: rows });

        // Close the connection
        await connection.end();
        console.log('MySQL connection closed');
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
        const skillLevel = req.body.skillLevel;

        // MySQL database configuration
        const dbConfig = {
            host: 'positive-health-int-team-2-backend-map-db-1',
            user: 'activity123',
            password: 'activity123123',
            database: 'map-db',
        };

        const connection = await createConnection(dbConfig);
        console.log('Connected to MySQL database');

        // Perform the SQL query to insert a new entry
        const newMeeting = { activity, meetingStartTime, meetingEndTime, locationLatitude, locationLongitude, skillLevel };
        const [result] = await connection.query('INSERT INTO Meetings SET ?', newMeeting);

        console.log('New meeting created:', result.insertId);
        res.json({ message: 'New meeting created', meetingId: result.insertId });

        // Close the connection
        await connection.end();
        console.log('MySQL connection closed');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}