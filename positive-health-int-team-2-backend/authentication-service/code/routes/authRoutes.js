import express from 'express';
import authController from '../controllers/authController.js';
import authenticateMiddleware from '../middleware/authenticate.js';

const router = express.Router();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/logout', authController.logout);

// Example protected route
router.get('/logintest', authenticateMiddleware, (req, res) => {
  res.json({ message: 'Profile accessed successfully',  redirect: '/logintest'});
});

export default router;
