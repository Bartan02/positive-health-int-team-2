import db from '../db.js';

export async function testTheFunctionality(req, res) { 
    res.status(200).send('Everything is super');
}

export async function getAllMeetings(req, res) {
    try {
        console.log('Fetching all meetings')
        // Perform the SQL query to retrieve all meetings
        const [rows] = await db.query('SELECT * FROM Meetings');

        // console.log('Fetched all meetings:', rows);
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

        const makerUserID = req.body.makerUserID;
        console.log(`makerUserID ${makerUserID}`)

        // Perform the SQL query to insert a new entry
        const newMeeting = { activity, meetingStartTime, meetingEndTime, locationLatitude, locationLongitude, skillLevel, makerUserID};
        const [result] = await db.query('INSERT INTO Meetings SET ?', newMeeting);

        const activityID = result.insertId;
        let playerID = makerUserID;
        const newPlayerActivity = { playerID, activityID };
        const [resultPlayerActivity] = await db.query('INSERT INTO PlayerActivity SET ?', newPlayerActivity);
        console.log(playerID)
        console.log('New meeting created:', result.insertId);
        res.json({ message: 'New meeting created', meetingId: result.insertId });
    } catch (error) {
        console.error('Error:', error); 
        res.status(500).json({ error: 'Something went wrong' });
    }
}

export function deleteMeeting(req, res) {
    try {
        const meetingID = req.params.meetingID;
        
        // Perform the SQL query to delete the entry
        db.query('DELETE FROM Meetings WHERE ID = ?', meetingID);

        console.log('Meeting deleted:', meetingID);
        res.json({ message: 'Meeting deleted' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

export async function joinMeeting(req, res) {
    try {
        const activityID = req.body.meetingID;
        const playerID = req.body.playerID;
    
        // Check if the entry already exists in the database
        const [existingEntry] = await db.query('SELECT * FROM PlayerActivity WHERE playerID = ? AND activityID = ?', [playerID, activityID]);
    
        if (existingEntry.length > 0) {
            // Entry already exists
            res.status(400).json({ error: 'Entry already exists in the database' });
        } else {
            // Perform the SQL query to insert a new entry
            const newPlayerActivity = { playerID, activityID };
            const [result] = await db.query('INSERT INTO PlayerActivity SET ?', newPlayerActivity);
    
            console.log('New player activity created:', result.insertId);
            res.json({ message: 'New player activity created', playerActivityId: result.insertId });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

export async function leaveMeeting(req, res) {
    try {
        const activityID = req.body.meetingID;
        const playerID = req.body.playerID;
    
        console.log('Player ID:', playerID);
        console.log('Activity ID:', activityID);
        // Perform the SQL query to delete the entry
        const [result] = await db.query('DELETE FROM PlayerActivity WHERE playerID = ? AND activityID = ?', [playerID, activityID]);
    
        console.log('Player activity deleted:', result.affectedRows);
        res.json({ message: 'Player activity deleted' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

export async function getMeetingPlayers(req, res) {
    try {
        const activityID = req.params.meetingID;
    
        // Perform the SQL query to retrieve all players for the meeting
        const [rows] = await db.query('SELECT * FROM PlayerActivity WHERE activityID = ?', activityID);
    
        // console.log('Fetched all players for the meeting:', rows);
        res.json({ players: rows });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}