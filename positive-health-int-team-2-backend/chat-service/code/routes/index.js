import express from 'express';
import chatController from '../controllers/chatController.js';
import cors from 'cors';

const router = express.Router();

// routes
router.post('/chat/redirectToChat', cors(), chatController.redirectToChat);
router.post('/chat/getChatConversation', cors(), chatController.getChatConversation);
router.post('/chat/sendMessage', cors(), chatController.sendMessage);

export default router;
