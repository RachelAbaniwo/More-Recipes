import db from '../models/index';

const { Downvote, Recipe } = db;


export default async (request, response, next) => {
  try {
    const recipe = await Recipe.findById(request.params.recipeId);

    if (!recipe) {
      return response.status(404).json({ message: 'Recipe not found.' });
    }

    if (recipe.userId === request.AuthUser.id) {
      return response.status(401).json({ message: 'Unauthorized' });
    }

    const query = { where: { userId: request.AuthUser.id, recipeId: request.params.recipeId } };

    const downvote = await Downvote.findOne(query);

    if (downvote) {
      await downvote.destroy();
      await recipe.decrement('downvotes');
    }
    next();
  } catch (error) {
    return response.status(400).json({ message: 'Invalid request.' });
  }
};
