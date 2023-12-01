import express from 'express';
import { testTheFunctionality } from '../controllers/mapController.js';
import { createMeeting } from '../controllers/mapController.js';
import { getAllMeetings } from '../controllers/mapController.js';

const router = express.Router();

router.post('/map/create-meeting', createMeeting);
router.get('/map/get-all-meetings', getAllMeetings);

router.get('/', testTheFunctionality);
// between

export default router;