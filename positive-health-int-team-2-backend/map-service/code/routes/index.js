import express from 'express';
import { testTheFunctionality } from '../controllers/mapController.js';
import { createMeeting } from '../controllers/mapController.js';
import { getAllInfo } from '../controllers/mapController.js';

const router = express.Router();

router.post('/map/create-meeting', createMeeting);
router.get('/map/get-all-info', getAllInfo);

router.get('/', testTheFunctionality);
// between

export default router;