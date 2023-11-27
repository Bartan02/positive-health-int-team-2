import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
const router = express.Router();

// create a proxy for each microservice
const activitiesProxy = createProxyMiddleware({
  target: 'http://localhost:3015',
  changeOrigin: true,
});

// create a proxy for each microservice
const authProxy = createProxyMiddleware({
  target: 'http://localhost:3020',
  changeOrigin: true,
});

router.use('/auth', cors(), authProxy);
router.use('/activities', cors(), activitiesProxy);

export default router;
