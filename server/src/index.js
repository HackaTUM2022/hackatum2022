import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import orderRouter from './routes/order.routes.js';
import matchesRouter from './routes/match.routes.js';
import gamesRouter from './routes/game.routes.js';
import newDayRouter from './routes/newDay.routes.js';
import './config/mongodb.config.js';

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());

app.use(bodyParser.urlencoded({
    parameterLimit: 100000,
    limit: '100mb',
    extended: true,
}));

app.use(bodyParser.json({
    limit: '100mb',
    type: 'application/json',
}));

// API Routes
app.get('/', (req, res) => {
    res.send('Hello from Hackatum!');
});

app.use('/orders', orderRouter);
app.use('/matches', matchesRouter);
app.use('/games', gamesRouter);

app.use('/newDay', newDayRouter);

app.listen(PORT, function () {
  console.log(`Server Listening on ${PORT}`);
});

export default app;
