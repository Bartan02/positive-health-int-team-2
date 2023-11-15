import express from 'express';
import { testTheFunctionality } from '../controllers/activityController.js';
import { getActivities } from '../controllers/activityController.js';
const router = express.Router();

// here define all the routes
router.get('/', (req, res, next) => {
    res.json('Activity service is running!');
  });

router.get('/', testTheFunctionality);
router.get('/activities', getActivities);
// between

export default router;