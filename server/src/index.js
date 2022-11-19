import bodyParser from 'body-parser';
import express from 'express';
import userRouter from '././routes/user.routes.js';
import consumptionRouter from '././routes/consumption.routes.js';
import './config/mongodb.config.js';
import cors from 'cors';

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());

app.use(bodyParser.urlencoded({
  parameterLimit: 100000,
  limit: '100mb',
  extended: true
}));

app.use(bodyParser.json({
  limit: '100mb',
  type: 'application/json'
}));

// API Routes
app.get('/', function (req, res) {
  res.send('Hello from Hackatum!');
});

app.use('/user', userRouter);

app.use('/consumption', consumptionRouter);

app.listen(PORT, function () {
  console.log(`Server Listening on ${PORT}`);
});

export default app;
