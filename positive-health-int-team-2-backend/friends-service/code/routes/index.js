import express from 'express';
import findFriend from '../controllers/friendsController.js';
import cors from 'cors';

const router = express.Router();

// routes
router.get('/friends/findperson/:prompt', cors() ,findFriend.findPerson);
router.get('/friends/findrelationship/:prompt', cors(), findFriend.findRelationship)


export default router;
