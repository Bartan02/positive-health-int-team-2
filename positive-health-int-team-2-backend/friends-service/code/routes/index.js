import express from 'express';
import findFriend from '../controllers/friendsController.js';
import cors from 'cors';

const router = express.Router();

// routes
router.get('/friends/find/:prompt', cors() ,findFriend.findFriend);

export default router;
