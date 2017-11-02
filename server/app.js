import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import RecipesController from './controllers/recipe';
import UserController from './controllers/user';
import db from './database/models';
import authMiddleware from './middleware/auth';
// Set up the express app
const app = express();
//  app.use('/api/recipes', router);

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const recipesController = new RecipesController();
const userController = new UserController();
// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('/api/v1/recipes', recipesController.getRecipes);
app.post('/api/v1/recipes', authMiddleware, recipesController.addRecipes);
app.put('/api/v1/recipes/:id', authMiddleware, recipesController.updateRecipe);
app.delete('/api/v1/recipes/:id', authMiddleware, recipesController.deleteRecipe);
app.post('/api/v1/recipes/:id/reviews', authMiddleware, recipesController.addReviews);
app.post('/api/v1/signup/', userController.userSignUp);
app.post('/api/v1/signin', userController.userSignIn);
app.post('/api/v1/users/:userId/recipes/:recipeId', authMiddleware, recipesController.addFavorite);
app.get('/api/v1/users/:id/recipes', authMiddleware, recipesController.getFavorites);
// app.put('/api/v1/recipes/:recipeId/upvotes', authMiddleware, recipesCon.addUpvotes)

app.use((req, res) => {
  res.json('ROUTE NOT REGISTERED.');
});

db.sequelize.sync().then(() => {
  app.listen(4044, () => {
    console.log('server is running');
  });
});

export default app;
