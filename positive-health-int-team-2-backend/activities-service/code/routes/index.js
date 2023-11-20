import express from 'express';
import { startActivity } from '../controllers/activityController.js';
import { updateLocation } from '../controllers/activityController.js';
import { stopActivity } from '../controllers/activityController.js';

const router = express.Router();

router.post('/start', startActivity);
router.post('/update-location', updateLocation);
router.post('/stop', stopActivity);
router.get('/', (req, res, next) => {
    res.json('Backend service is running!');
  });
export default router;