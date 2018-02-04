import db from '../models/index';

const { Recipe } = db;


export default async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found.' });
    }

    if (recipe.userId === req.AuthUser.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.FavoriteRecipe = recipe;
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Invalid request.' });
  }
};
