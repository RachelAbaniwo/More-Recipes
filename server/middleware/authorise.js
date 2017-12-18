import db from '../models/index';

export default (req, res, next) => {
  db.Recipe.findById(req.params.recipeId).then((recipe) => {
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    if (recipe.userId !== req.AuthUser.id) {
      return res.status(401).json({ message: 'Unauthorized USER' });
    }

    next();
  }).catch(() => res.status(400).json({ message: 'Invalid Request' }));
};
