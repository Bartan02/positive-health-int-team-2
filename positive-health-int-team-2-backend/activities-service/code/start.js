// start.js setup from learnnode.com by Wes Bos
import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';
import https from 'https';
import activityRouter from './routes/index.js';

dotenv.config({ path: 'variables.env' });

const app = express();

// support json encoded and url-encoded bodies, mainly used for post and update
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/activity', cors(), activityRouter);

// SSL/TLS certificate options
const options = {
  key: fs.readFileSync('./localhost-key.pem'),
  cert: fs.readFileSync('./localhost.pem')
};

app.set('port', process.env.PORT || 3015);

// Create HTTPS server
const server = https.createServer(options, app).listen(app.get('port'), () => {
  console.log(`🍿 Express running on HTTPS → PORT ${server.address().port}`);
});
