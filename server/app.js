import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import RecipesController from './controllers/recipe';
import UserController from './controllers/user';
import db from './database/models';
import authenticationMiddleWare from './middleware/auth';
import authorisationMiddleWare from './middleware/authorise';
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
app.get('/api/v1/recipes/:id', recipesController.getOneRecipe);
app.get('/api/v1/users/myrecipes', authenticationMiddleWare, recipesController.getMyRecipes);
app.get('/api/v1/users/:id/recipes', authenticationMiddleWare, recipesController.getUserRecipes);
app.post('/api/v1/recipes', authenticationMiddleWare, recipesController.addRecipes);
app.put('/api/v1/recipes/:id', authenticationMiddleWare, authorisationMiddleWare, recipesController.updateRecipe);
app.delete('/api/v1/recipes/:id', authenticationMiddleWare, authorisationMiddleWare, recipesController.deleteRecipe);
app.post('/api/v1/recipes/:id/review', authenticationMiddleWare, recipesController.addReviews);
app.post('/api/v1/signup/', userController.userSignUp);
app.post('/api/v1/signin', userController.userSignIn);
app.post('/api/v1/users/favorites/:recipeId', authenticationMiddleWare, recipesController.addFavorite);
app.get('/api/v1/users/favorites', authenticationMiddleWare, recipesController.getFavorites);
app.post('/api/v1/recipes/:recipeId/upvotes', authenticationMiddleWare, recipesController.addUpvotes);
app.post('/api/v1/recipes/:recipeId/downvotes', authenticationMiddleWare, recipesController.addDownvotes);


app.use((req, res) => {
  res.json('UNKNOWN REQUEST.');
});

db.sequelize.sync().then(() => {
  app.listen(4044, () => {
    console.log('server is running');
  });
});

export default app;
