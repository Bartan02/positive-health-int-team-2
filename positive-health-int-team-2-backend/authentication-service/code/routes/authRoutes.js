import express from 'express';
import authController from '../controllers/authController.js';
import authenticateMiddleware from '../middleware/authenticate.js';
import notAuthenticateMiddleware from '../middleware/notAuthenticate.js';

const router = express.Router();

router.options('/auth', (req, res, next) => {
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

router.post('/auth/register', authController.register);

router.post('/auth/login', authController.login);

router.post('/auth/logout', authenticateMiddleware, authController.logout);

// Example protected route
router.get('/auth/logintest', authenticateMiddleware, (req, res) => {
  res.json({ message: 'Profile accessed successfully',  redirect: '/logintest'});
});

router.get('/auth/test', (req, res) => {
  res.status(200).send('it works!')
})

export default router;
