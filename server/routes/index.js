import Recipe from '../controllers/recipe';
import recipes from '../models/recipe';

export default (app) => {
  
  
  app.get('/api/recipes', Recipe.getRecipe);
  app.post('/api/recipes', Recipe.addRecipe);
  app.put('/api/recipes/:recipeId', Recipe.modifyRecipes);
  app.delete('/api/recipes/:recipeId', Recipe.deleteRecipes);
}

