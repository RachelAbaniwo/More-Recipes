import db from '../models/index';

const { Recipe, Upvote } = db;

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

    const upvote = await Upvote.findOne(query);

    if (upvote) {
      await upvote.destroy();
      await recipe.decrement('upvotes');
    }
    next();
  } catch (error) {
    return response.status(400).json({ message: 'Invalid request.' });
  }
};
