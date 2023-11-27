// Purpose: Defines the routes for your backend service.
// Routes:
// POST /start: Starts an activity.
// POST /update-location: Updates the location of an ongoing activity.
// POST /stop: Stops an activity.
// GET /: A simple health check route to confirm the backend service is running.

import express from 'express';
import { startActivity, updateLocation, stopActivity } from '../controllers/activityController.js';

const router = express.Router();

// Route to start a new activity
router.post('/start', startActivity);

// Route to update the location of an activity
router.post('/update-location', updateLocation);

// Route to stop an ongoing activity
router.post('/stop', stopActivity);

// Health check route
router.get('/', (req, res, next) => {
    res.json('Backend service is running!');
});

export default router;