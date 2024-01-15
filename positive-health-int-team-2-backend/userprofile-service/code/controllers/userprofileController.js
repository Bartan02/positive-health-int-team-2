import db from '../db.js';

export async function testTheFunctionality(req, res) { 
    res.status(200).send('Everything is super');
}

export async function getUserInfo(req, res) {
    try {
        const userId = req.params.userid;
        console.log('Fetching user info for user:', userId);
        const [rows] = await db.query('SELECT * FROM Users WHERE userid = ?', userId);
        return res.json({ user: rows[0] });
    }catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

export async function createUserProfile(req, res) {
    try {
        const userId = req.body.userid;
        console.log('Creating user profile for user:', userId);
        const [rows] = await db.query('INSERT INTO Users (userid) VALUES (?)', userId);
    }catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

export async function updateUserProfile(req, res) {
    try{
        console.log(req.body);
        const userId = req.body.userid;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const profilePic = req.body.profilePic;
        const height = req.body.height;
        const weight = req.body.weight;
        const gender = req.body.gender;
        const dateOfBirth = req.body.dateOfBirth;
        const favoriteSports = req.body.favoriteSports;
        const location = req.body.location;
        console.log('Updating user profile for user:', userId);
        const updateQuery = `
            UPDATE Users 
            SET 
                firstName = ?,
                lastName = ?,   
                profilePic = ?,
                height = ?,
                weight = ?,
                gender = ?,
                dateOfBirth = ?,
                favoriteSports = ?,
                location = ?
            WHERE userid = ?
        `;

        const response = await db.query(updateQuery, [
            firstName,
            lastName,
            profilePic,
            height,
            weight,
            gender,
            dateOfBirth,
            favoriteSports,
            location,
            userId
        ]);

        return res.json({ user: response });
    }catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}