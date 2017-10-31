import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import RecipesController from './server/controllers/recipe';
// Set up the express app
const app = express();
//  app.use('/api/recipes', router);

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const recipesCon = new RecipesController();

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('/api/v1/recipes', recipesCon.getRecipes);
app.post('/api/v1/recipes', recipesCon.addRecipes);
app.put('/api/v1/recipes/:id', recipesCon.updateRecipe);
app.delete('/api/v1/recipes/:id', recipesCon.deleteRecipe);
app.post('/api/v1/recipes/:id/review', recipesCon.addReviews);


app.listen(4044, () => {
  console.log('server is running');
});

export default app;
