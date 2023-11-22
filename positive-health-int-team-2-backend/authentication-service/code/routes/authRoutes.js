import express from 'express';
import authController from '../controllers/authController.js';
import authenticateMiddleware from '../middleware/authenticate.js';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

// Example protected route
router.get('/profile', authenticateMiddleware, (req, res) => {
  res.json({ message: 'Profile accessed successfully' });
});

export default router;
