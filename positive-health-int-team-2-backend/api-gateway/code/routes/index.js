import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
const router = express.Router();

const corsOptions = {
  origin: "http://localhost:5173/",
  methods: 'GET, POST, PUT, DELETE'
};

router.use(cors(corsOptions));

const activitiesProxy = createProxyMiddleware({
  target: 'https://my-activities-service-c4850aca1f8f.herokuapp.com/' || 'http://activities-service:3015',
  changeOrigin: true,
  onProxyReq(proxyReq, req, res) {
    if (req.body) {
      proxyReq.setHeader('Content-Type', 'application/json');
      proxyReq.write(JSON.stringify(req.body));
    }
  }
});

const authProxy = createProxyMiddleware({
  target: /*'https://step-up-authentication-8a051a52be97.herokuapp.com' ||*/ 'http://authentication-service:3020',
  changeOrigin: true,
  onProxyReq(proxyReq, req, res) {
    if (req.body) {
      proxyReq.setHeader('Content-Type', 'application/json');
      proxyReq.write(JSON.stringify(req.body));
    }
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
