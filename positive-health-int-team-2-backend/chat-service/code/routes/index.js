import express from 'express';
import { responseExample, updateExample } from '../controllers/exampleController.js';
import { checkName } from '../middleware/exampleMiddleware.js';
const router = express.Router();

// routes
router.get('/', (req, res, next) => {
  res.json('Backend service is running!');
});
router.get('/example', checkName, responseExample);
router.post('/example', checkName, updateExample);

export default router;
