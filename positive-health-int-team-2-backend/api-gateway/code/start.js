import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

dotenv.config({ path: 'variables.env' });
import indexRouter from './routes/index.js';

const app = express();

const corsOptions = {
  origin: "http://localhost:5173/",
  methods: 'GET, POST, PUT, DELETE',
  optionsSuccessStatus: 200,
};

// Enable CORS for all routes and origins
app.use(cors(corsOptions));
app.options('*', cors());

// support json encoded and url-encoded bodies, mainly used for post and update
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.options('*', cors())


app.use('/', cors(corsOptions), indexRouter);

app.set('port', process.env.PORT || 3025);
const server = app.listen(app.get('port'), () => {
  console.log(`🍿 Express running → PORT ${server.address().port}`);
});