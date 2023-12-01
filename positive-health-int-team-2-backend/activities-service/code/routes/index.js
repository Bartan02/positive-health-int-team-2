// Purpose: Defines the routes for your backend service.
// Routes:
// POST /start: Starts an activity.
// POST /update-location: Updates the location of an ongoing activity.
// POST /stop: Stops an activity.
// GET /: A simple health check route to confirm the backend service is running.

import express from 'express';
import { startActivity, updateLocation, stopActivity } from '../controllers/activityController.js';

const router = express.Router();

router.options('/activities', (req, res, next) => {
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

// Route to start a new activity
router.post('/start', startActivity);

// Route to update the location of an activity
router.post('/update-location', updateLocation);

// Route to stop an ongoing activity
router.post('/stop', stopActivity);

// Health check route
router.get('/test', (req, res) => {
  res.json('Test route works!');
});

export default router;