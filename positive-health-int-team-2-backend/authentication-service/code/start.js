import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' });
import cors from 'cors';
import authRouter from './routes/index.js';

const app = express();

// support json encoded and url-encoded bodies, mainly used for post and update
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/auth', cors(), authRouter);

app.set('port', process.env.PORT || 3020);
const server = app.listen(app.get('port'), () => {
  console.log(`🍿 Express running → PORT ${server.address().port}`);
 });

// import express from 'express';
// import mongoose from 'mongoose';
// import authRoutes from './routes/authRoutes.js';

// const app = express();
// const PORT = 3020;

// mongoose.connect('mongodb://localhost/auth-service', { useNewUrlParser: true, useUnifiedTopology: true });

// app.use(express.json());
// app.use('/auth', authRoutes);

// app.set('port', process.env.PORT || 3020);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });