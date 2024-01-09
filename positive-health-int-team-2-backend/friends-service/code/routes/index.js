import express from 'express';
import findFriend from '../controllers/findController.js';
import friend from '../controllers/friendsController.js';
import cors from 'cors';

const router = express.Router();

// routes
router.get('/friends/findperson/:prompt', cors() ,findFriend.findPerson);
router.get('/friends/findrelationships/:prompt', cors(), findFriend.findRelationships)
router.post('/friends/addFriend', cors(), friend.addFriend)


export default router;
