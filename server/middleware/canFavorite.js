import db from '../models/index';

const { Recipe } = db;


export default async (request, response, next) => {
  try {
    const recipe = await Recipe.findById(request.params.recipeId);

    if (!recipe) {
      return response.status(404).json({ message: 'Recipe not found.' });
    }

    if (recipe.userId === request.AuthUser.id) {
      return response.status(401).json({ message: 'Unauthorized' });
    }
    request.FavoriteRecipe = recipe;
    next();
  } catch (error) {
    return response.status(400).json({ message: 'Invalid request.' });
  }
};
