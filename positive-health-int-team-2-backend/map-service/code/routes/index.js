import express from 'express';
import { testTheFunctionality } from '../controllers/activityController.js';
import { createMeeting } from '../controllers/activityController.js';
import { getAllInfo } from '../controllers/activityController.js';

const router = express.Router();

router.post('/map/create-meeting', createMeeting);
router.get('/map/get-all-info', getAllInfo);

router.get('/', testTheFunctionality);
// between

export default router;