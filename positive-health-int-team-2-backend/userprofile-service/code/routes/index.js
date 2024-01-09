import express from 'express';
import { getUserInfo, testTheFunctionality, createUserProfile, updateUserProfile} from '../controllers/userprofileController.js';

const router = express.Router();

router.options('/userInfo', (req, res, next) => {
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

router.get('/userInfo/getUserInfo/:userid', getUserInfo);
router.post('/userInfo/createUserProfile', createUserProfile)
router.post('/userInfo/updateUserProfile', updateUserProfile)
router.get('/', testTheFunctionality);
// between

export default router;