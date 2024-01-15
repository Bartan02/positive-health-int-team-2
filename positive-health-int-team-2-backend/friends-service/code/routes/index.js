import express from 'express';
import findFriend from '../controllers/findController.js';
import friend from '../controllers/friendsController.js';
import cors from 'cors';

const router = express.Router();

// routes
router.get('/friends/findperson/:prompt', cors() ,findFriend.findPerson);
router.get('/friends/findrelationships/:prompt', cors(), findFriend.findRelationships);
router.post('/friends/addFriend', cors(), friend.addFriend);
router.post('/friends/acceptFriend', cors(), friend.acceptFriend);
router.post('/friends/rejectFriend', cors(), friend.rejectFriend);
router.post('/friends/getFriendsRequests', cors(), friend.getFriendRequests);
router.post('/friends/getFriendsList', cors(), friend.getFriendsList);
router.post('/friends/getRelationship', cors(), findFriend.getRelationship);


export default router;
