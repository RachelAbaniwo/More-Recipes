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
app.get('/api/recipes', recipesCon.getRecipes);
app.post('/api/recipes', recipesCon.addRecipes);
app.put('/api/recipes/:id', recipesCon.updateRecipe);
app.delete('/api/recipes/:id', recipesCon.deleteRecipe);
app.post('/api/recipes/:id/review', recipesCon.addReviews);


app.listen(8000, () => {
  console.log('server is running');
});

