import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
const router = express.Router();


// create a proxy for each microservice
const activitiesProxy = createProxyMiddleware({
  target: 'http://activities-service:3015',
  changeOrigin: true,
  onProxyReq(proxyReq, req, res){
    proxyReq.write(JSON.stringify(req.body));
  }
});

// create a proxy for each microservice
const authProxy = createProxyMiddleware({
  target: 'http://authentication-service:3020',
  changeOrigin: true,
  onProxyReq(proxyReq, req, res){
    proxyReq.write(JSON.stringify(req.body));
  }
});

// create a proxy for each microservice
const friendsProxy = createProxyMiddleware({
  target: 'http://friends-service:3021',
  changeOrigin: true,
  onProxyReq(proxyReq, req, res){
    proxyReq.write(JSON.stringify(req.body));
  }
});

router.use('/auth', cors(), authProxy);
router.use('/activities', cors(), activitiesProxy);
router.use('/friends', cors(), friendsProxy);
router.use('/test', cors(), (req,res) => {
  res.status(200).send('API gateway works!');
});

export default router;
