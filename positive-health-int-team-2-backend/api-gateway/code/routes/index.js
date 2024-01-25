import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
const router = express.Router();

const activitiesProxy = createProxyMiddleware({
  target: 'https://my-activities-service-c4850aca1f8f.herokuapp.com/',
  changeOrigin: true,
  onProxyReq(proxyReq, req, res) {
    if (req.body) {
      proxyReq.setHeader('Content-Type', 'application/json');
      proxyReq.write(JSON.stringify(req.body));
    }
  }
});

const authProxy = createProxyMiddleware({
  target: 'https://step-up-authentication-8a051a52be97.herokuapp.com',
  changeOrigin: true,
  onProxyReq(proxyReq, req, res) {
    if (req.body) {
      proxyReq.setHeader('Content-Type', 'application/json');
      proxyReq.write(JSON.stringify(req.body));
    }
  }
});

const friendsProxy = createProxyMiddleware({
  target: 'https://step-up-friends-f48d59608b7f.herokuapp.com',
  changeOrigin: true,
  onProxyReq(proxyReq, req, res){
    proxyReq.write(JSON.stringify(req.body));
  }
});

const chatProxy = createProxyMiddleware({
  target: 'https://step-up-chat-066c495a8234.herokuapp.com',
  changeOrigin: true,
  onProxyReq(proxyReq, req, res){
    proxyReq.write(JSON.stringify(req.body));
  }
});

const mapProxy = createProxyMiddleware({
  target: 'https://map-service-94dff95542c5.herokuapp.com',
  changeOrigin: true,
  onProxyReq(proxyReq, req, res){
    proxyReq.write(JSON.stringify(req.body));
  }
});

const userProfileProxy = createProxyMiddleware({
  target: 'https://userprofile-service-329f9e3f251a.herokuapp.com',
  changeOrigin: true,
  onProxyReq(proxyReq, req, res){
    proxyReq.write(JSON.stringify(req.body));
  }
});



router.use('/auth', cors(), authProxy);
router.use('/activities', cors(), activitiesProxy);
router.use('/friends', cors(), friendsProxy);
router.use('/chat', cors(), chatProxy);
router.use('/map', cors(), mapProxy);
router.use('/userInfo', cors(), userProfileProxy);
router.use('/test', cors(), (req,res) => {
  res.status(200).send('API gateway works!');
});

export default router;
