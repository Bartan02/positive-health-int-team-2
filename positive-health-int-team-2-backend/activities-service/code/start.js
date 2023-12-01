// // start.js setup from learnnode.com by Wes Bos
// import express from 'express';
// import * as dotenv from 'dotenv';
// dotenv.config({ path: 'variables.env' });
// import cors from 'cors';
// import activityRouter from './routes/index.js';

// const app = express();

// // support json encoded and url-encoded bodies, mainly used for post and update
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// app.use('/activity', cors(), activityRouter);

// app.set('port', process.env.PORT || 3015);
// const server = app.listen(app.get('port'), () => {
//   console.log(`🍿 Express running → PORT ${server.address().port}`);
// });

import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' });
import cors from 'cors';
import activityRouter from './routes/index.js';
import { updateLocation } from './controllers/activityController.js';

const app = express();

// support json encoded and url-encoded bodies, mainly used for post and update
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'https://step-up-frontend-ced8cec1ddfe.herokuapp.com' }));

app.use('/activities', cors(), activityRouter);

app.set('port', process.env.PORT || 3015);
const server = app.listen(app.get('port'), () => {
  console.log(`🍿 Express running → PORT ${server.address().port}`);
});


