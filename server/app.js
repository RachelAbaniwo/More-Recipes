import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import bodyParser from 'body-parser';
import db from './models';
import routes from './routes/routes';

// Set up the express app
const app = express();

require('dotenv').config();

const port = parseInt(process.env.PORT, 10) || 4044;

// Log requests to the console.
app.use(logger('dev'));

// enable cors for all requests
app.use(cors());

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// mount all routes on /api routes

app.use('/api/v1', routes);

// Setup a default catch-all route that sends back a welcome message in JSON format.

app.use((req, res) => {
  res.json('UNKNOWN REQUEST.');
});

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log('server is running');
  });
});

export default app;
