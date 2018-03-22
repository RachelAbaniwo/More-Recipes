import db from '../models/index';

const { Recipe } = db;


export default (request, response, next) => {
  Recipe.findById(request.params.recipeId).then((recipe) => {
    if (!recipe) {
      return response.status(404).json({ message: 'Recipe not found' });
    }

    if (recipe.userId !== request.AuthUser.id) {
      return response.status(401).json({ message: 'Unauthorized' });
    }

    next();
  }).catch(() => response.status(400).json({ message: 'Invalid request' }));
};
