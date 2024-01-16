// start.js setup from learnnode.com by Wes Bos
import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' });
import cors from 'cors';
import indexRouter from './routes/index.js';
import sequelize from './connection/connection.js'

const app = express();

// support json encoded and url-encoded bodies, mainly used for post and update
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync().then(() => {
  console.log('Database synced');
  // Start the Express app after syncing
  app.use('/', cors(), indexRouter);
  app.set('port', process.env.PORT || 3090);
  const server = app.listen(app.get('port'), () => {
    console.log(`🍿 Express running → PORT ${server.address().port}`);
  });
}).catch(err => console.error('Error syncing database:', err));
