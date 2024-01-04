import express from 'express';
import { testTheFunctionality } from '../controllers/mapController.js';
import { createMeeting } from '../controllers/mapController.js';
import { getAllMeetings } from '../controllers/mapController.js';
import { deleteMeeting } from '../controllers/mapController.js';
import { joinMeeting } from '../controllers/mapController.js';
import { getMeetingPlayers } from '../controllers/mapController.js';
import { leaveMeeting } from '../controllers/mapController.js';

const router = express.Router();

router.options('/map', (req, res, next) => {
    try {
      //set header before response
      res.header({
        allow: 'GET, POST, OPTIONS',
        'Content-type': 'application/json',
        Data: Date.now(),
        'Content-length': 0,
      });
      //response
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
});

router.post('/map/create-meeting', createMeeting);
router.post('/map/join-meeting', joinMeeting);
router.delete('/map/delete-meeting/:meetingID', deleteMeeting);
router.get('/map/get-all-meetings', getAllMeetings);
router.get('/map/get-meeting-players/:meetingID', getMeetingPlayers);
router.post('/map/leave-meeting', leaveMeeting);

router.get('/', testTheFunctionality);
// between

export default router;