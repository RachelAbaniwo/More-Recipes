import express from 'express';
import path from 'path';
import cors from 'cors';
import logger from 'morgan';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './../api-docs/swagger.json';

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
app.use(express.static(path.join(__dirname, 'public')));
// mount all routes on /api routes

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1', routes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

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
