
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import bodyParser from 'body-parser';
import db from './database/models';
import routes from './routes/routes';


// Set up the express app
const app = express();
//  app.use('/api/recipes', router);

// Log requests to the console.
app.use(logger('dev'));

// enable cors for all requests
app.use(cors());

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup a default catch-all route that sends back a welcome message in JSON format.

app.use('/api/v1', routes);

app.use((req, res) => {
  res.json('UNKNOWN REQUEST.');
});

db.sequelize.sync().then(() => {
  app.listen(4044, () => {
    console.log('server is running');
  });
});

export default app;
