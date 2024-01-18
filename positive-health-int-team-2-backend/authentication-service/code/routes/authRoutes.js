import express from 'express';
import authController from '../controllers/authController.js';
import authenticateMiddleware from '../middleware/authenticate.js';
import notAuthenticateMiddleware from '../middleware/notAuthenticate.js';
import getIdFromTheirUsername from '../controllers/userRetrieve.js'
import userRetrieve from '../controllers/userRetrieve.js'
import cors from 'cors';

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
  res.json({ message: 'Profile accessed successfully',  redirect: '/logintest', userId: req.userId});
});

router.get('/auth/test', (req, res) => {
  res.status(200).send('it works!')
})

router.get('/auth/user/:prompt', cors() ,userRetrieve.findUser);

router.post('/auth/getUsernamesFromTheirIds', cors(), userRetrieve.getUsernamesFromTheirIds)

router.post('/auth/getUsernameFromTheirId', cors(), userRetrieve.getUsernameFromTheirId)

router.get('/auth/getIdFromTheirUsername/:username', cors(), userRetrieve.getIdFromTheirUsername)

router.get('/auth/getuserid', authController.getUserID);

export default router;
